const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// LIST (public or protected depending on your app)
router.get("/", blogController.getBlogs);

// CREATE (admin) - multipart support
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single('image'),
  blogController.createBlog
);

// SINGLE (id or slug)
router.get("/:param", blogController.getBlog);

// UPDATE (admin) - add upload middleware to parse multipart/form-data for PUT
router.put(
  "/:param",
  verifyToken,
  isAdmin,
  upload.single('image'),
  blogController.updateBlog
);

// DELETE (admin)
router.delete(
  "/:param",
  verifyToken,
  isAdmin,
  blogController.deleteBlog
);

module.exports = router;