const mongoose = require("mongoose")

const { Schema } = mongoose

const MessageSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    message: { type: String, required: true, trim: true },
    newsletter: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false }, // admin için okunma durumu
  },
  { timestamps: true }
)

module.exports =
  mongoose.models && mongoose.models.Message
    ? mongoose.models.Message
    : mongoose.model("Message", MessageSchema)
