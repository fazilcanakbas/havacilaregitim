const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

// List
router.get("/", announcementController.getAnnouncements);

// Create
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.array('images', 3),
  announcementController.createAnnouncement
);

// Single (id veya slug)
router.get("/:param", announcementController.getAnnouncement);

// Update
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.array('images', 3),
  announcementController.updateAnnouncement
);

// Delete
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  announcementController.deleteAnnouncement
);

module.exports = router;
