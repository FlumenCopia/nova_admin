const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, uploadHeroBanner, uploadLeaderImage, uploadFounderImage } = require('../controllers/settingsController');
const { requireAuth } = require('../middleware/authMiddleware');
const { uploadSingle, processBannerImage } = require('../middleware/uploadMiddleware');

router.use(requireAuth);

router.get('/', getSettings);
router.put('/', updateSettings);
router.post('/banner', uploadSingle, processBannerImage, uploadHeroBanner);
router.post('/leader-image', uploadSingle, processBannerImage, uploadLeaderImage);
router.post('/founder-image', uploadSingle, processBannerImage, uploadFounderImage);

module.exports = router;
