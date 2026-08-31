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

module.exports = {
  uploadSingle: upload.single('image'),
  processPortfolioImage,
  processClientLogoImage,
};
