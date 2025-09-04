const Contact = require("../models/contact.model");

// İletişim bilgilerini getir
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne(); // Tek kayıt tutulacak
    if (!contact) {
      return res.status(404).json({ error: "İletişim bilgisi bulunamadı" });
    }
    res.json(contact);
  } catch (err) {
    console.error("getContact error:", err);
    res.status(500).json({ error: "İletişim bilgisi alınamadı" });
  }
};

// İletişim bilgilerini güncelle veya oluştur
exports.updateContact = async (req, res) => {
  try {
    const data = req.body;
    let contact = await Contact.findOne();

    if (!contact) {
      contact = new Contact(data);
    } else {
      Object.assign(contact, data);
    }

    await contact.save();
    res.json(contact);
  } catch (err) {
    console.error("updateContact error:", err);
    res.status(500).json({ error: "İletişim bilgisi güncellenemedi" });
  }
};
