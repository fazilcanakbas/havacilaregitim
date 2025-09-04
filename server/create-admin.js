// create-admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');
    
    // User modelini tanımla
    const UserSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      name: String,
      title: String,
      isAdmin: Boolean,
      isActive: Boolean
    });
    
    const User = mongoose.model('User', UserSchema);
    
    // Kullanıcı var mı kontrol et
    const username = 'admin@havacilaregitim.com';
    const existingUser = await User.findOne({ username });
    
    if (existingUser) {
      console.log(`"${username}" kullanıcısı zaten var, siliniyor...`);
      await User.deleteOne({ username });
    }
    
    
    const password = 'Havacilaregitim2025';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Yeni admin kullanıcısı oluştur
    const newAdmin = new User({
      username,
      email: 'admin@havacilaregitim.com',
      password: hashedPassword,
      name: 'Havacılar Eğitim',
      title: 'Site Yöneticisi',
      isAdmin: true,
      isActive: true
    });
    
    await newAdmin.save();
    console.log('Yeni admin kullanıcısı başarıyla oluşturuldu!');
    console.log('Kullanıcı adı:', username);
    console.log('Şifre:', password);
    
    // Şifre doğrulama testi
    const testUser = await User.findOne({ username });
    const testMatch = await bcrypt.compare(password, testUser.password);
    console.log(`Şifre doğrulama testi: ${testMatch ? 'Başarılı ✓' : 'Başarısız ✗'}`);
    
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

createAdmin();