const express = require('express');
const router = express.Router();
const {
  getAllPortfolioAdmin,
  uploadPortfolioImage,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../controllers/portfolioController');
const { requireAuth } = require('../middleware/authMiddleware');
const { uploadSingle, processPortfolioImage } = require('../middleware/uploadMiddleware');

router.use(requireAuth);

router.get('/', getAllPortfolioAdmin);
router.post('/upload', uploadSingle, processPortfolioImage, uploadPortfolioImage);
router.post('/', uploadSingle, processPortfolioImage, createPortfolioItem);
router.put('/:id', uploadSingle, processPortfolioImage, updatePortfolioItem);
router.delete('/:id', deletePortfolioItem);

module.exports = router;
