const express = require('express');
const router = express.Router();
const { login, logout, me, changePassword } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const loginRateLimiter = require('../middleware/loginRateLimiter');

router.post('/login', loginRateLimiter, login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);
router.put('/change-password', requireAuth, changePassword);

module.exports = router;
