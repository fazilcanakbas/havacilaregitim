const fs = require('fs');
const path = require('path');
const Announcement = require("../models/announcement.model");

// GET /api/announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const { category, isActive, search, limit, skip } = req.query;
    const and = [];

    if (typeof isActive !== "undefined") and.push({ isActive: isActive === 'true' });
    if (category) and.push({ $or: [{ category }, { categoryEn: category }] });

    if (search) {
      const regex = { $regex: search, $options: "i" };
      and.push({
        $or: [
          { title: regex },
          { description: regex },
          { content: regex },
          { titleEn: regex },
          { descriptionEn: regex }
        ]
      });
    }

    const query = and.length ? { $and: and } : {};

    const announcements = await Announcement.find(query)
      .sort({ date: -1 })
      .skip(Number(skip) || 0)
      .limit(Number(limit) || 50);

    res.json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Duyurular alınamadı" });
  }
};

// GET single announcement by ID
exports.getAnnouncement = async (req, res) => {
  try {
    const param = req.params.param; 
let ann;
if (param.match(/^[0-9a-fA-F]{24}$/)) {
  ann = await Announcement.findById(param);
} else {
  ann = await Announcement.findOne({ slug: param });
}
    if (!ann) return res.status(404).json({ error: "Duyuru bulunamadı" });
    res.json(ann);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Duyuru alınamadı" });
  }
};


// Helper: slugify
function slugify(text) {
  if (!text) return `${Date.now()}`;
  return text
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Helper: unique slug
async function makeUniqueSlug(baseSlug, excludeId = null) {
  let slug = baseSlug;
  let counter = 0;
  while (counter < 1000) {
    const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug };
    const existing = await Announcement.findOne(query);
    if (!existing) return slug;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  return `${baseSlug}-${Date.now()}`;
}

// CREATE
exports.createAnnouncement = async (req, res) => {
  try {
    req.body = req.body || {};
    const {
      title, description, content, author,
      category, categoryEn,
      titleEn, descriptionEn, contentEn,
      isActive, featured
    } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(f => `/uploads/announcements/${f.filename}`);
    }

    // slug oluştur
    let baseSlug = slugify(title || description || `announcement-${Date.now()}`);
    let finalSlug = await makeUniqueSlug(baseSlug);

    const announcement = new Announcement({
      title, description, content,
      author,
      category, categoryEn,
      titleEn, descriptionEn, contentEn,
      images,
      isActive, featured,
      slug: finalSlug
    });

    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Duyuru oluşturulamadı", detail: err.message });
  }
};

// UPDATE
exports.updateAnnouncement = async (req, res) => {
  try {
    req.body = req.body || {};
    const { id } = req.params;

    let announcement = await Announcement.findById(id);
    if (!announcement) return res.status(404).json({ error: "Duyuru bulunamadı" });

    // Eski resimler (client'tan gelen)
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch (e) {
        existingImages = [];
      }
    } else {
      existingImages = announcement.images || [];
    }

    // Yeni yüklenenler
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map(f => `/uploads/announcements/${f.filename}`);
    }

    // Güncel resim listesi
    announcement.images = [...existingImages, ...newImages].slice(0, 3);

    // Diğer alanlar
    const fields = [
      "title", "description", "content", "author",
      "category", "categoryEn",
      "titleEn", "descriptionEn", "contentEn",
      "isActive", "featured"
    ];
    fields.forEach(field => {
      if (typeof req.body[field] !== "undefined") {
        announcement[field] = req.body[field];
      }
    });

    // Slug güncelle
    if (req.body.slug) {
      const sanitized = slugify(req.body.slug);
      announcement.slug = await makeUniqueSlug(sanitized, announcement._id);
    } else if (req.body.title && req.body.title !== announcement.title) {
      const sanitized = slugify(req.body.title);
      announcement.slug = await makeUniqueSlug(sanitized, announcement._id);
    }

    const saved = await announcement.save();
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Duyuru güncellenemedi", detail: err.message });
  }
};


// DELETE
exports.deleteAnnouncement = async (req, res) => {
  try {
    const id = req.params.id;
    const ann = await Announcement.findById(id);
    if (!ann) return res.status(404).json({ error: "Duyuru bulunamadı" });

    // Eski görselleri sil (isteğe bağlı)
    if (ann.images && ann.images.length) {
      ann.images.forEach(img => {
        if (img.startsWith('/uploads/announcements/')) {
          const absPath = path.join(__dirname, '../..', img);
          if (fs.existsSync(absPath)) {
            fs.unlinkSync(absPath);
          }
        }
      });
    }

    await Announcement.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Silme işlemi başarısız" });
  }
};
