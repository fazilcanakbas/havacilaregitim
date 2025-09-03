const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  excerpt:      { type: String, required: true },
  content:      { type: String, required: true },

  // English optional fields
  titleEn:      { type: String },
  excerptEn:    { type: String },
  contentEn:    { type: String },

  date:         { type: Date,   default: Date.now },
  author:       { type: String, required: true },
  image:        { type: String, required: true },

  // Turkish tags/category
  tags:         [{ type: String }],
  category:     { type: String, required: true },

  // English tags/category (optional)
  tagsEn:       [{ type: String }],
  categoryEn:   { type: String },

  isActive:     { type: Boolean, default: true },
  views:        { type: Number, default: 0 },
  slug:         { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);