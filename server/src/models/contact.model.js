const mongoose = require("mongoose");

const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    address: { type: String, trim: true },
    addressEn: { type: String, trim: true },
    workingHours: { type: String, trim: true },
    workingHoursEn: { type: String, trim: true },
    website: { type: String, trim: true },
    socialMedia: {
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
    mapCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
