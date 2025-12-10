const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Check for token in header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    // We don't block immediately because we need to check if DB is empty in the controller
    req.user = null; 
    return next();
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;