// server.js
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  // Content Security Policy'i devre dışı bırak (resimler için)
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS ayarları
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000','https://6041cfa1cc3f.ngrok-free.app','https://havacilaregitim.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Sadece bir kez tanımla - Önceki statik dosya middleware'ini kaldırın
// Uploads klasörünün varlığını kontrol et ve yoksa oluştur
const uploadsDir = path.join(__dirname, 'uploads');
const propertiesDir = path.join(uploadsDir, 'properties');
const announcementsDir = path.join(uploadsDir, 'announcements');
const agentsDir = path.join(uploadsDir, 'agents');
const servicesDir = path.join(uploadsDir, 'services');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created');
}

if (!fs.existsSync(propertiesDir)) {
  fs.mkdirSync(propertiesDir);
  console.log('Properties uploads directory created');
}

// Statik dosyalar için middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// Routes
try {
  const authRoutes = require('./src/routes/auth.routes');
  app.use('/api/auth', authRoutes);
  console.log('Auth routes loaded');
} catch (error) {
  console.error('Error loading auth routes:', error);
}
try {
  const blogRoutes = require('./src/routes/blog.routes');
  app.use('/api/blogs', blogRoutes);
  console.log('Blog routes loaded');
} catch (error) {
  console.error('Error loading blog routes:', error);
}
try {
  const serviceRoutes = require('./src/routes/service.routes');
  app.use('/api/services', serviceRoutes);
  console.log('Service routes loaded');
} catch (error) {
  console.error('Error loading service routes:', error);
}
try {
  const announcementRoutes = require('./src/routes/announcement.routes');
  app.use('/api/announcements', announcementRoutes);
  console.log('Announcement routes loaded');
} catch (error) {
  console.error('Error loading announcement routes:', error);
}
// Base route
app.get('/', (req, res) => {
  res.send('Havacılara Eğitim API is running');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });