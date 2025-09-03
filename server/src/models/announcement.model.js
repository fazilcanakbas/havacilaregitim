const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  content:     { type: String, required: true },
  author:      { type: String, required: true },
  category:    { type: String, required: true },
  categoryEn:  { type: String },
  titleEn:     { type: String },
  descriptionEn: { type: String },
  contentEn:   { type: String },
  images:      [{ type: String }],
  isActive:    { type: Boolean, default: true },
  featured:    { type: Boolean, default: false },
  date:        { type: Date, default: Date.now },
  slug:        { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
