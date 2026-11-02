const jwt = require('jsonwebtoken');

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (process.env.NODE_ENV === 'production') {
    if (!secret || secret === 'fallback_jwt_secret_nova' || secret.length < 32) {
      throw new Error('FATAL: In production, JWT_SECRET must be explicitly defined and at least 32 characters.');
    }
    return secret;
  }
  return secret || 'fallback_jwt_secret_nova';
};

// Perform production startup check
if (process.env.NODE_ENV === 'production') {
  getJwtSecret();
}

const generateToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d', algorithm: 'HS256' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] });
  } catch (error) {
    return null;
  }
};

module.exports = {
  getJwtSecret,
  generateToken,
  verifyToken,
};
