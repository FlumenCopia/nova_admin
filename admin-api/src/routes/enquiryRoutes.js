const express = require('express');
const router = express.Router();
const { getAllEnquiries, updateEnquiryStatus, deleteEnquiry } = require('../controllers/enquiryController');
const { requireAuth } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

router.use(requireAuth);

router.get('/', getAllEnquiries);
router.patch('/:id', validateObjectId('id'), updateEnquiryStatus);
router.delete('/:id', validateObjectId('id'), deleteEnquiry);

module.exports = router;
