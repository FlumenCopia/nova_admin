const express = require('express');
const router = express.Router();
const {
  getAllClientsAdmin,
  createClientLogo,
  deleteClientLogo,
} = require('../controllers/clientController');
const { requireAuth } = require('../middleware/authMiddleware');
const { uploadSingle, processClientLogoImage } = require('../middleware/uploadMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

router.use(requireAuth);

router.get('/', getAllClientsAdmin);
router.post('/', uploadSingle, processClientLogoImage, createClientLogo);
router.delete('/:id', validateObjectId('id'), deleteClientLogo);

module.exports = router;
