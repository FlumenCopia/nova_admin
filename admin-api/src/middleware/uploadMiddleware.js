const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WebP, GIF) are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

// Middleware to process Portfolio image with Sharp
const processPortfolioImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filename = `portfolio-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const targetFolder = path.join(__dirname, '../../uploads/portfolio');

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const outputPath = path.join(targetFolder, filename);

    await sharp(req.file.buffer)
      .resize(1600, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    req.processedImageUrl = `/uploads/portfolio/${filename}`;
    next();
  } catch (error) {
    console.error('Sharp image processing error:', error);
    return res.status(400).json({ success: false, message: 'Failed to process image file.' });
  }
};

// Middleware to process Client Logo image with Sharp
const processClientLogoImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filename = `client-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const targetFolder = path.join(__dirname, '../../uploads/clients');

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const outputPath = path.join(targetFolder, filename);

    await sharp(req.file.buffer)
      .resize(400, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    req.processedImageUrl = `/uploads/clients/${filename}`;
    next();
  } catch (error) {
    console.error('Sharp client logo processing error:', error);
    return res.status(400).json({ success: false, message: 'Failed to process client logo image.' });
  }
};

// Middleware to process Hero Banner image with Sharp
const processBannerImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filename = `banner-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const targetFolder = path.join(__dirname, '../../uploads/banners');

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const outputPath = path.join(targetFolder, filename);

    await sharp(req.file.buffer)
      .resize(2560, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    req.processedImageUrl = `/uploads/banners/${filename}`;
    next();
  } catch (error) {
    console.error('Sharp banner processing error:', error);
    return res.status(400).json({ success: false, message: 'Failed to process banner image.' });
  }
};

const crypto = require('crypto');

// Gallery-specific file filter (static JPEG, PNG, WebP only; rejects animated GIFs)
const GALLERY_ALLOWED_EXTS = /\.(jpe?g|png|webp)$/i;
const GALLERY_ALLOWED_MIMES = /^image\/(jpeg|jpg|png|webp)$/i;

const galleryFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname || '').toLowerCase();
  if (ext === '.gif' || file.mimetype === 'image/gif') {
    return cb(new Error('Animated GIFs are not supported. Only static JPEG, PNG, and WebP images are allowed.'), false);
  }
  const extValid = GALLERY_ALLOWED_EXTS.test(ext);
  const mimeValid = GALLERY_ALLOWED_MIMES.test(file.mimetype);
  if (extValid && mimeValid) {
    cb(null, true);
  } else {
    cb(new Error('Only valid image files (JPEG, PNG, WebP) are allowed.'), false);
  }
};

const galleryUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 10,                  // max 10 files
  },
  fileFilter: galleryFileFilter,
});

const galleryUploadMultiple = (req, res, next) => {
  galleryUpload.array('images', 10)(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds limit (max 10MB per image).' });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ success: false, message: 'Unexpected field name or file limit exceeded (max 10 images under "images" field).' });
      }
      return res.status(400).json({ success: false, message: err.message || 'Image upload validation error.' });
    }
    next();
  });
};

// Middleware to process multiple Portfolio images with Sharp & all-or-nothing rollback
const processMultiplePortfolioImages = async (req, res, next) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No image files provided.' });
  }

  const targetFolder = path.join(__dirname, '../../uploads/portfolio');
  try {
    await fs.promises.mkdir(targetFolder, { recursive: true });
  } catch (dirErr) {
    console.error('Directory creation error:', dirErr);
    return res.status(500).json({ success: false, message: 'Internal server error preparing upload directory.' });
  }

  const createdFiles = [];
  const processedImages = [];

  try {
    for (const file of req.files) {
      if (!file.buffer || file.buffer.length === 0) {
        throw new Error('Zero-byte or empty image file rejected.');
      }

      const safeFilename = `portfolio-${Date.now()}-${crypto.randomBytes(8).toString('hex')}.webp`;
      const outputPath = path.join(targetFolder, safeFilename);

      await sharp(file.buffer)
        .rotate()
        .resize({
          width: 1600,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(outputPath);

      createdFiles.push(outputPath);
      processedImages.push({
        url: `/uploads/portfolio/${safeFilename}`,
        filename: safeFilename,
      });
    }

    req.processedImages = processedImages;
    req.processedImageUrls = processedImages.map((img) => img.url);
    next();
  } catch (error) {
    console.error('Sharp multiple image processing error:', error.message || error);

    // Roll back all newly created files asynchronously
    for (const filePath of createdFiles) {
      try {
        await fs.promises.unlink(filePath);
      } catch (unlinkErr) {
        console.error('Rollback unlink error for:', filePath, unlinkErr.message);
      }
    }

    const safeMsg = error.message && (error.message.includes('Zero-byte') || error.message.includes('not supported'))
      ? error.message
      : 'Failed to process image file. Ensure all images are valid, uncorrupted JPEG, PNG, or WebP.';

    return res.status(400).json({ success: false, message: safeMsg });
  }
};

module.exports = {
  uploadSingle: upload.single('image'),
  galleryUploadMultiple,
  processPortfolioImage,
  processMultiplePortfolioImages,
  processClientLogoImage,
  processBannerImage,
};
