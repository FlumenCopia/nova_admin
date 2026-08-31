const express = require('express');
const router = express.Router();
const { createEnquiry } = require('../controllers/enquiryController');
const { getPublicPortfolio } = require('../controllers/portfolioController');
const { getPublicClients } = require('../controllers/clientController');
const { getPublicServices } = require('../controllers/serviceController');
const { getSettings } = require('../controllers/settingsController');

router.post('/enquiries', createEnquiry);
router.get('/portfolio', getPublicPortfolio);
router.get('/clients', getPublicClients);
router.get('/services', getPublicServices);
router.get('/settings', getSettings);

module.exports = router;
