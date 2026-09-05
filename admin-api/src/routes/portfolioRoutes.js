const express = require('express');
const router = express.Router();
const {
  getAllPortfolioAdmin,
  getMediaLibrary,
  uploadPortfolioImage,
  uploadMultiplePortfolioImages,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../controllers/portfolioController');
const { requireAuth } = require('../middleware/authMiddleware');
const {
  uploadSingle,
  galleryUploadMultiple,
  processPortfolioImage,
  processMultiplePortfolioImages,
} = require('../middleware/uploadMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

router.use(requireAuth);

// Named routes registered before dynamic /:id parameter routes
router.get('/', getAllPortfolioAdmin);
router.get('/media-library', getMediaLibrary);
router.post('/upload', uploadSingle, processPortfolioImage, uploadPortfolioImage);
router.post('/upload-multiple', galleryUploadMultiple, processMultiplePortfolioImages, uploadMultiplePortfolioImages);
router.post('/', uploadSingle, processPortfolioImage, createPortfolioItem);
router.put('/:id', validateObjectId('id'), uploadSingle, processPortfolioImage, updatePortfolioItem);
router.delete('/:id', validateObjectId('id'), deletePortfolioItem);

module.exports = router;
