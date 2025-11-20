const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'ChangeThisSecret', { expiresIn: '2d' });
};

module.exports = generateToken;
