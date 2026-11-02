const express = require('express');
const router = express.Router();
const {
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { requireAuth } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

router.use(requireAuth);

router.get('/', getAllServicesAdmin);
router.post('/', createService);
router.put('/:id', validateObjectId('id'), updateService);
router.delete('/:id', validateObjectId('id'), deleteService);

module.exports = router;
