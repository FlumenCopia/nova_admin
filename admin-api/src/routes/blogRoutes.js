const express = require('express');
const router = express.Router();
const {
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddleware');
const { uploadSingle, processBlogCoverImage } = require('../middleware/uploadMiddleware');
const { validateObjectId } = require('../middleware/validateObjectId');

router.use(requireAuth);

router.get('/', getAllBlogsAdmin);
router.post('/', uploadSingle, processBlogCoverImage, createBlog);
router.put('/:id', validateObjectId('id'), uploadSingle, processBlogCoverImage, updateBlog);
router.delete('/:id', validateObjectId('id'), deleteBlog);

module.exports = router;
