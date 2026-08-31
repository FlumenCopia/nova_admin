const express = require('express');
const router = express.Router();
const {
  getAllClientsAdmin,
  createClientLogo,
  deleteClientLogo,
} = require('../controllers/clientController');
const { requireAuth } = require('../middleware/authMiddleware');
const { uploadSingle, processClientLogoImage } = require('../middleware/uploadMiddleware');

router.use(requireAuth);

router.get('/', getAllClientsAdmin);
router.post('/', uploadSingle, processClientLogoImage, createClientLogo);
router.delete('/:id', deleteClientLogo);

module.exports = router;
