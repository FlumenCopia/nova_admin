const express = require('express');
const router = express.Router();
const {
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} = require('../controllers/founderSlideController');
const { requireAuth } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');
const { uploadSingle, processFounderSlideImage } = require('../middleware/uploadMiddleware');

router.use(requireAuth);

router.get('/', getAllSlides);
router.post('/', uploadSingle, processFounderSlideImage, createSlide);
router.put('/:id', validateObjectId('id'), uploadSingle, processFounderSlideImage, updateSlide);
router.delete('/:id', validateObjectId('id'), deleteSlide);

module.exports = router;
