const Message = require("../models/message.model")

// Public: Yeni mesaj oluştur
exports.createMessage = async (req, res) => {
  try {
    const data = req.body || {}

    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return res.status(400).json({ error: "Zorunlu alanlar eksik" })
    }

    const msg = new Message({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      program: data.program,
      message: data.message,
      newsletter: data.newsletter || false,
    })

    await msg.save()
    return res.status(201).json(msg)
  } catch (err) {
    console.error("createMessage error:", err)
    return res.status(500).json({ error: "Mesaj kaydedilemedi" })
  }
}

// Admin: tüm mesajları listele (okunma durumuna göre filtrelenebilir)
exports.listMessages = async (req, res) => {
  try {
    const { isRead } = req.query
    const filter = {}
    if (typeof isRead !== "undefined") filter.isRead = isRead === "true"

   const messages = await Message.find()
  .sort({ createdAt: -1 })
  .populate("program", "title titleEn") // sadece başlıkları getir
    return res.json(messages)
  } catch (err) {
    console.error("listMessages error:", err)
    return res.status(500).json({ error: "Mesajlar alınamadı" })
  }
}

// Admin: tek mesajı oku
exports.getMessage = async (req, res) => {
  try {
    const { id } = req.params
    const msg = await Message.findById(id)
    if (!msg) return res.status(404).json({ error: "Mesaj bulunamadı" })
    return res.json(msg)
  } catch (err) {
    console.error("getMessage error:", err)
    return res.status(500).json({ error: "Mesaj alınamadı" })
  }
}

// Admin: mesajı okundu olarak işaretle
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params
    const msg = await Message.findByIdAndUpdate(id, { isRead: true }, { new: true })
    if (!msg) return res.status(404).json({ error: "Mesaj bulunamadı" })
    return res.json(msg)
  } catch (err) {
    console.error("markAsRead error:", err)
    return res.status(500).json({ error: "Mesaj güncellenemedi" })
  }
}

// Admin: mesaj sil
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params
    const msg = await Message.findByIdAndDelete(id)
    if (!msg) return res.status(404).json({ error: "Mesaj bulunamadı" })
    return res.json({ message: "Mesaj silindi" })
  } catch (err) {
    console.error("deleteMessage error:", err)
    return res.status(500).json({ error: "Mesaj silinemedi" })
  }
}
