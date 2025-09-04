const express = require("express")
const {
  createMessage,
  listMessages,
  getMessage,
  markAsRead,
  deleteMessage,
} = require("../controllers/message.controller")

const router = express.Router()

// Public
router.post("/", createMessage)

// Admin
router.get("/", listMessages)
router.get("/:id", getMessage)
router.put("/:id/read", markAsRead)
router.delete("/:id", deleteMessage)

module.exports = router
