// routes/service.route.js
const express = require('express');
const {
  listServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require('../controllers/service.controller');

const upload = require('../middleware/upload.middleware');

const router = express.Router();

// Public
router.get('/', listServices);
router.get('/:id', getService);

// Admin routes with upload middleware for images
// note: apply your auth middleware before create/update/delete in your app if needed
router.post('/', upload.array('images', 3), createService);
router.put('/:id', upload.array('images', 3), updateService);
router.delete('/:id', /* authMiddleware */ deleteService);

module.exports = router;