const mongoose = require('mongoose');

const { Schema } = mongoose;

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    titleEn: { type: String, trim: true },
    details: { type: String ,required: true},
    detailsEn: { type: String,trim: true },
    description: { type: String, required: true },
    descriptionEn: { type: String, trim: true },
    features: { type: [String], default: [] },
    featuresEn: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    benefitsEn: { type: [String], default: [] },
    processSteps: { type: [String], default: [] },
    processStepsEn: { type: [String], default: [] },
    duration: { type: String, trim: true },
    durationEn: { type: String, trim: true },
    format: { type: String, trim: true },
    formatEn: { type: String, trim: true },
    price: { type: String, trim: true },
    category: { type: String, trim: true, default: 'General' },
    status: { type: String, enum: ['active', 'draft'], default: 'draft' },
    enrolledStudents: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    images: [{ type: String, trim: true }], 
    slug: { type: String, trim: true, index: true },
    number: { type: Number, default: 0 },

  },
  { timestamps: true }
);

module.exports = mongoose.models && mongoose.models.Service
  ? mongoose.models.Service
  : mongoose.model('Service', ServiceSchema);