const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

// GET iletişim bilgisi
router.get("/", contactController.getContact);

// PUT iletişim bilgisi güncelle
router.put("/", contactController.updateContact);

module.exports = router;
