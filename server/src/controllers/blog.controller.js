const fs = require('fs');
const path = require('path');
const Blog = require("../models/blog.model");
// Admin kontrolü (isteğe bağlı local kontrol)
const isAdminLocal = (req) => req.isAdmin === true;

// Helper: Başlıktan güvenli slug üretir
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

// Helper: Veritabanında benzersiz slug olacak şekilde düzenler
async function makeUniqueSlug(baseSlug, excludeId = null) {
  let slug = baseSlug;
  let counter = 0;
  while (counter < 1000) {
    // Eğer excludeId varsa onu sorgudan hariç tut
    const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug };
    const existing = await Blog.findOne(query);
    if (!existing) return slug;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  return `${baseSlug}-${Date.now()}`;
}

// GET /api/blogs or list
exports.getBlogs = async (req, res) => {
  try {
    const { search, category, tag, isActive, limit, skip } = req.query;

    const and = [];

    if (typeof isActive !== "undefined") and.push({ isActive: isActive === 'true' });

    if (category) {
      // support filtering by TR or EN category
      and.push({ $or: [{ category }, { categoryEn: category }] });
    }

    if (tag) {
      // support filtering by TR or EN tags
      and.push({ $or: [{ tags: tag }, { tagsEn: tag }] });
    }

    if (search) {
      const regex = { $regex: search, $options: "i" };
      and.push({
        $or: [
          { title: regex },
          { excerpt: regex },
          { author: regex },
          { titleEn: regex },
          { excerptEn: regex }
        ]
      });
    }

    const query = and.length ? { $and: and } : {};

    const blogs = await Blog.find(query)
      .sort({ date: -1 })
      .skip(Number(skip) || 0)
      .limit(Number(limit) || 50);

    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bloglar alınamadı" });
  }
};

// GET single by id or slug
exports.getBlog = async (req, res) => {
  try {
    const param = req.params.param;
    let blog;
    if (param && param.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(param);
    } else {
      blog = await Blog.findOne({ slug: param });
    }
    if (!blog) return res.status(404).json({ error: "Blog bulunamadı" });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Blog alınamadı" });
  }
};

exports.createBlog = async (req, res) => {
  // verifyToken + isAdmin middleware'leri route üzerinde çalışmalı
  try {
    // Güvenlik: req.body boş olabilir -> default {}
    req.body = req.body || {};

    // Temel alanlar (req.body içeriği FormData veya JSON olabilir)
    const {
      title,
      excerpt,
      content,
      author,
      category,
      isActive,
      slug: incomingSlug,
      titleEn,
      excerptEn,
      contentEn,
      categoryEn
    } = req.body;

    // tags parse
    let tags = [];
    if (req.body.tags) {
      if (typeof req.body.tags === 'string') {
        try { tags = JSON.parse(req.body.tags); }
        catch (e) { tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean); }
      } else if (Array.isArray(req.body.tags)) {
        tags = req.body.tags;
      }
    }

    // tagsEn parse
    let tagsEn = [];
    if (req.body.tagsEn) {
      if (typeof req.body.tagsEn === 'string') {
        try { tagsEn = JSON.parse(req.body.tagsEn); }
        catch (e) { tagsEn = req.body.tagsEn.split(',').map(t => t.trim()).filter(Boolean); }
      } else if (Array.isArray(req.body.tagsEn)) {
        tagsEn = req.body.tagsEn;
      }
    }

    // image handling
    let image = '';
    if (req.file) {
      image = `/uploads/blogs/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }

    // Slug oluşturma / benzersizleştirme
    let finalSlug = incomingSlug;
    if (!finalSlug) {
      const base = slugify(title || excerpt || `post-${Date.now()}`);
      finalSlug = await makeUniqueSlug(base);
    } else {
      const base = slugify(finalSlug);
      finalSlug = await makeUniqueSlug(base);
    }

    const blog = new Blog({
      title,
      excerpt,
      content,
      // english optional fields
      titleEn,
      excerptEn,
      contentEn,

      author,
      category,
      categoryEn,
      isActive,
      slug: finalSlug,
      tags,
      tagsEn,
      image,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({ error: "Blog oluşturulamadı", detail: err.message, errors: err.errors });
    }
    res.status(400).json({ error: "Blog oluşturulamadı", detail: err.message || String(err) });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    req.body = req.body || {};
    const param = req.params.param;

    console.log('[updateBlog] param:', param);
    console.log('[updateBlog] raw req.body:', req.body);
    console.log('[updateBlog] req.file present?', !!req.file);

    // Eğer dosya geldiyse image alanını ayarla (dosya yüklenmişse multer zaten req.file koyar)
    if (req.file) {
      req.body.image = `/uploads/blogs/${req.file.filename}`;
    }

    // tags parse (FormData ile string olabilir)
    if (req.body.tags && typeof req.body.tags === 'string') {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (e) {
        req.body.tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }

    // tagsEn parse (FormData ile string olabilir)
    if (req.body.tagsEn && typeof req.body.tagsEn === 'string') {
      try {
        req.body.tagsEn = JSON.parse(req.body.tagsEn);
      } catch (e) {
        req.body.tagsEn = req.body.tagsEn.split(',').map(t => t.trim()).filter(Boolean);
      }
    }

    // NOT: slug sanitize/benzersizleştirmeyi blog'u bulduktan sonra yapacağız
    // Bulup güncelle -> find, assign, save (pre-save hook'ların çalışması için)
    let blog;
    if (param && param.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(param);
    } else {
      blog = await Blog.findOne({ slug: param });
    }

    if (!blog) {
      console.log('[updateBlog] blog not found for param:', param);
      return res.status(404).json({ error: "Blog bulunamadı" });
    }

    console.log('[updateBlog] existing blog before update:', {
      _id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      categoryEn: blog.categoryEn,
      isActive: blog.isActive,
      tags: blog.tags,
      tagsEn: blog.tagsEn,
      image: blog.image,
      slug: blog.slug,
    });

    // Sadece gelen alanları ata (boş stringleri isterseniz ayrı ele alabilirsiniz)
    const updatableFields = [
      'title','excerpt','content','author','category','categoryEn',
      'isActive','tags','tagsEn','image','date','featured',
      'titleEn','excerptEn','contentEn'
    ];
    updatableFields.forEach(field => {
      if (typeof req.body[field] !== 'undefined') {
        blog[field] = req.body[field];
      }
    });

    // Slug işleme:
    // - Eğer client yeni bir slug gönderdiyse (req.body.slug tanımlı) -> sanitize ve benzersizleştir
    //   burada makeUniqueSlug'a kendi blog._id'nizi vererek kendinizi hariç tutarsınız.
    // - Eğer client slug göndermediyse, mevcut slug korunur (başlık değişse bile).
    if (typeof req.body.slug !== 'undefined' && req.body.slug !== null && req.body.slug !== '') {
      const sanitized = slugify(req.body.slug);
      // Eğer sanitized ile mevcut blog.slug farklıysa benzersizleştiriyoruz
      if (sanitized !== blog.slug) {
        blog.slug = await makeUniqueSlug(sanitized, blog._id);
      } else {
        // aynı slug gönderilmiş, hiçbir şey yapmaya gerek yok
        blog.slug = blog.slug;
      }
    }
    // Eğer req.body.slug tamamen boş string veya undefined ise mevcut slug korunur.

    const saved = await blog.save();
    console.log('[updateBlog] saved blog:', {
      _id: saved._id,
      title: saved.title,
      excerpt: saved.excerpt,
      slug: saved.slug,
      image: saved.image,
      tags: saved.tags,
      tagsEn: saved.tagsEn,
      categoryEn: saved.categoryEn,
      titleEn: saved.titleEn
    });

    return res.json(saved);
  } catch (err) {
    console.error('[updateBlog] error:', err);
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({ error: "Blog güncellenemedi", detail: err.message, errors: err.errors });
    }
    return res.status(400).json({ error: "Blog güncellenemedi", detail: err.message || String(err) });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const param = req.params.param;
    let blog;
    if (param && param.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(param);
    } else {
      blog = await Blog.findOne({ slug: param });
    }
    if (!blog) return res.status(404).json({ error: "Blog bulunamadı" });

    // Blog görselini dosya sisteminden sil (varsa ve uploads/blogs içindeyse)
    if (blog.image && blog.image.startsWith('/uploads/blogs/')) {
      const absPath = path.join(__dirname, '../..', blog.image);
      try {
        if (fs.existsSync(absPath)) {
          fs.unlinkSync(absPath);
        }
      } catch (err) {
        console.error('Blog görseli silinemedi:', absPath, err);
      }
    }

    // Blogu veritabanından sil
    if (param && param.match(/^[0-9a-fA-F]{24}$/)) {
      await Blog.findByIdAndDelete(param);
    } else {
      await Blog.findOneAndDelete({ slug: param });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Silme işlemi başarısız" });
  }
};