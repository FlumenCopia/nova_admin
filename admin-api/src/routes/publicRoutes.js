const express = require('express');
const router = express.Router();
const { createEnquiry } = require('../controllers/enquiryController');
const { getPublicPortfolio } = require('../controllers/portfolioController');
const { getPublicClients } = require('../controllers/clientController');
const { getPublicServices } = require('../controllers/serviceController');
const { getSettings } = require('../controllers/settingsController');
const { getPublicSlides } = require('../controllers/founderSlideController');
const { getPublicBlogs, getPublicBlogBySlug } = require('../controllers/blogController');
const { enquiryRateLimiter } = require('../middleware/enquiryRateLimiter');

router.post('/enquiries', enquiryRateLimiter, createEnquiry);
router.get('/portfolio', getPublicPortfolio);
router.get('/clients', getPublicClients);
router.get('/services', getPublicServices);
router.get('/settings', getSettings);
router.get('/founder-gallery', getPublicSlides);
router.get('/blogs', getPublicBlogs);
router.get('/blogs/:slug', getPublicBlogBySlug);

module.exports = router;
