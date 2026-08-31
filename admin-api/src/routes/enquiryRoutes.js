const express = require('express');
const router = express.Router();
const { getAllEnquiries, updateEnquiryStatus, deleteEnquiry } = require('../controllers/enquiryController');
const { requireAuth } = require('../middleware/authMiddleware');

router.use(requireAuth);

router.get('/', getAllEnquiries);
router.patch('/:id', updateEnquiryStatus);
router.delete('/:id', deleteEnquiry);

module.exports = router;
