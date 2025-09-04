const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Service = require('../models/service.model');
const slugify = require('slugify');

/**
 * Helper to parse arrays that may come as JSON strings (from form fields) or arrays already.
 */
function parseArrayField(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === 'string') {
    // Try parse JSON array
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch (e) {
      // Fallback: split by newlines and commas
      return val
        .split(/\r?\n|,\s*/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
}

/**
 * Public: list services with optional query params (search, category, status)
 */
exports.listServices = async function (req, res) {
  try {
    const { search, category, status, limit = '100', skip = '0' } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { titleEn: { $regex: search, $options: 'i' } },
        { descriptionEn: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) filter.category = category;
    if (status) filter.status = status;

const services = await Service.find(filter)
  .sort({ number: 1 })   // önce number’a göre sırala
  .skip(parseInt(skip, 10))
  .limit(Math.min(parseInt(limit, 10), 500));

    return res.json(services);
  } catch (err) {
    console.error('listServices error:', err);
    return res.status(500).json({ error: 'Hizmetler alınamadı' });
  }
};

/**
 * Public: get single service by id or slug
 */
exports.getService = async function (req, res) {
  const param = req.params.id; // route param name in your routes is likely ':id'
  try {
    console.debug(`[getService] param received: "${param}"`);

    // Try as ObjectId first (fast and reliable if param is id)
    if (param && mongoose.Types.ObjectId.isValid(param)) {
      try {
        const byId = await Service.findById(param);
        if (byId) {
          console.debug('[getService] found by _id');
          return res.json(byId);
        }
      } catch (err) {
        console.error('[getService] error finding by _id:', err);
        // continue to try slug searches
      }
    }

    // Try exact slug match
    if (param) {
      try {
        const bySlug = await Service.findOne({ slug: param });
        if (bySlug) {
          console.debug('[getService] found by exact slug');
          return res.json(bySlug);
        }
      } catch (err) {
        console.error('[getService] error finding by exact slug:', err);
        // continue to next attempt
      }
    }

    // Try slugified version (normalize input)
    if (param) {
      const normalized = slugify(String(param), { lower: true, locale: 'tr' });
      if (normalized !== param) {
        try {
          const byNormalized = await Service.findOne({ slug: normalized });
          if (byNormalized) {
            console.debug('[getService] found by slugified param:', normalized);
            return res.json(byNormalized);
          }
        } catch (err) {
          console.error('[getService] error finding by slugified param:', err);
        }
      }
    }

    // Not found
    console.debug('[getService] not found for param:', param);
    return res.status(404).json({ error: 'Hizmet bulunamadı' });
  } catch (err) {
    console.error('getService error:', err, { param });
    return res.status(500).json({ error: 'Hizmet alınırken hata oluştu' });
  }
};

/**
 * Admin: create service
 * Assumes authentication/authorization is handled by middleware before this handler.
 */
exports.createService = async function (req, res) {
  try {
    const data = req.body || {};
    if (!data.title || !data.description) {
      return res.status(400).json({ error: 'Başlık ve açıklama gereklidir' });
    }

    // use provided slug or generate with slugify (locale 'tr' ensures Turkish transliteration)
    const slug = data.slug || slugify(String(data.title), { lower: true, locale: 'tr' });

    const service = new Service({
      title: data.title,
      titleEn: data.titleEn,
      description: data.description,
      descriptionEn: data.descriptionEn,
      details: data.details,
      detailsEn: data.detailsEn,
      features: parseArrayField(data.features).slice(0, 4),
      featuresEn: parseArrayField(data.featuresEn).slice(0, 4),
      benefits: parseArrayField(data.benefits),
      benefitsEn: parseArrayField(data.benefitsEn),
      processSteps: parseArrayField(data.processSteps),
      processStepsEn: parseArrayField(data.processStepsEn),
      duration: data.duration,
      durationEn: data.durationEn,
      format: data.format,
      formatEn: data.formatEn,
      price: data.price,
      category: data.category,
      status: data.status || 'draft',
      enrolledStudents: Number(data.enrolledStudents || 0),
      rating: Number(data.rating || 0),
      slug,
      
    });
    const lastService = await Service.findOne().sort({ number: -1 })
service.number = lastService ? lastService.number + 1 : 1


    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      service.images = req.files.map(file =>
        path.join('/uploads', file.destination.split(path.sep).slice(-1)[0] || 'services', file.filename).replace(/\\/g, '/')
      );
    }

    await service.save();
    return res.status(201).json(service);
  } catch (err) {
    console.error('createService error:', err);
    return res.status(500).json({ error: 'Hizmet oluşturulamadı' });
  }
};

/**
 * Admin: update service
 */
exports.updateService = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body || {};
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ error: 'Hizmet bulunamadı' });

    // direct fields that can be overwritten if provided
    const fields = [
      'title', 'titleEn', 'description', 'descriptionEn',
      'details', 'detailsEn', 'duration', 'durationEn',
      'format', 'formatEn', 'price', 'category',
      'status', 'enrolledStudents', 'rating', 'slug', 'number'
    ];

    fields.forEach((f) => {
      if (typeof data[f] !== 'undefined') {
        // coerce numeric-like strings for these fields if needed
        if ((f === 'enrolledStudents' || f === 'rating') && typeof data[f] === 'string') {
          service[f] = Number(data[f]);
        } else {
          service[f] = data[f];
        }
      }
    });

    // arrays
    if (typeof data.features !== 'undefined') {
      service.features = parseArrayField(data.features).slice(0, 4);
    }
    if (typeof data.featuresEn !== 'undefined') {
      service.featuresEn = parseArrayField(data.featuresEn).slice(0, 4);
    }
    if (typeof data.benefits !== 'undefined') {
      service.benefits = parseArrayField(data.benefits);
    }
    if (typeof data.benefitsEn !== 'undefined') {
      service.benefitsEn = parseArrayField(data.benefitsEn);
    }
    if (typeof data.processSteps !== 'undefined') {
      service.processSteps = parseArrayField(data.processSteps);
    }
    if (typeof data.processStepsEn !== 'undefined') {
      service.processStepsEn = parseArrayField(data.processStepsEn);
    }

    // IMAGES handling
    const prevImages = Array.isArray(service.images) ? [...service.images] : [];

    // parse existingImages if provided (array or JSON string)
    let keptImages = undefined;
    if (typeof data.existingImages !== 'undefined') {
      if (Array.isArray(data.existingImages)) {
        keptImages = data.existingImages.filter(Boolean);
      } else if (typeof data.existingImages === 'string') {
        try {
          const parsed = JSON.parse(data.existingImages);
          if (Array.isArray(parsed)) {
            keptImages = parsed.filter(Boolean);
          } else {
            keptImages = parseArrayField(data.existingImages);
          }
        } catch (err) {
          keptImages = parseArrayField(data.existingImages);
        }
      }
    }

    // map uploaded files to paths (same mapping as createService)
    let uploadedPaths = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      uploadedPaths = req.files.map(file =>
        path.join('/uploads', file.destination.split(path.sep).slice(-1)[0] || 'services', file.filename).replace(/\\/g, '/')
      );
    }

    // compute final images array
    if (typeof keptImages === 'undefined' && uploadedPaths.length === 0) {
      // client didn't send existingImages and didn't upload files => do not change service.images
    } else {
      const finalImages = [...(keptImages || []), ...uploadedPaths].slice(0, 3); // enforce max 3 (adjust as needed)
      service.images = finalImages;

      // remove deleted files from disk (those in prevImages but not in finalImages)
      const removed = prevImages.filter(p => !finalImages.includes(p));
      for (const imgPath of removed) {
        try {
          const absPath = path.join(__dirname, '../..', imgPath);
          if (fs.existsSync(absPath)) {
            fs.unlinkSync(absPath);
          }
        } catch (err) {
          console.error('Could not delete removed image:', imgPath, err);
        }
      }
    }

    await service.save();
    return res.json(service);
  } catch (err) {
    console.error('updateService error:', err);
    return res.status(500).json({ error: 'Hizmet güncellenemedi' });
  }
};

/**
 * Admin: delete service
 */
exports.deleteService = async function (req, res) {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ error: 'Hizmet bulunamadı' });

    // Servise ait görselleri sil
    if (service.images && Array.isArray(service.images)) {
      for (const imgPath of service.images) {
        // Dosya yolu, genellikle "/uploads/services/xxx.jpg" gibi
        // Proje köküne göre mutlak yolu oluştur
        const absPath = path.join(__dirname, '../..', imgPath);
        try {
          if (fs.existsSync(absPath)) {
            fs.unlinkSync(absPath);
          }
        } catch (err) {
          console.error('Görsel silinemedi:', absPath, err);
        }
      }
    }

    // Servisi veritabanından sil
    await Service.findByIdAndDelete(id);

    return res.json({ message: 'Hizmet ve görselleri silindi' });
  } catch (err) {
    console.error('deleteService error:', err);
    return res.status(500).json({ error: 'Hizmet silinirken hata oluştu' });
  }
};