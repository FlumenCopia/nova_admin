const { ObjectId } = require('mongodb');

/**
 * Validates whether an identifier is a canonical 24-character hexadecimal MongoDB ObjectId.
 * @param {any} id
 * @returns {boolean}
 */
const isValidObjectId = (id) => {
  if (!id || typeof id !== 'string') return false;
  // Strictly enforce canonical 24-character hexadecimal ObjectId format
  if (!/^[0-9a-fA-F]{24}$/.test(id)) return false;
  return ObjectId.isValid(id);
};

/**
 * Express middleware to validate that a route parameter is a valid MongoDB ObjectId.
 * Returns HTTP 400 Bad Request if the format is invalid.
 * @param {string} paramName - Name of the route parameter (default: 'id')
 */
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid identifier format. Must be a 24-character hexadecimal ObjectId.`,
      });
    }
    next();
  };
};

module.exports = {
  isValidObjectId,
  validateObjectId,
};
