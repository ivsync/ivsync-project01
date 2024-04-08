const jwt = require('jsonwebtoken');

function generateToken(payload, expiresIn = process.env.EXPIRES_IN || '14d') {
  return jwt.sign(payload, process.env.SECRET, { expiresIn });
}

module.exports = {
  generateToken,
};
