
const jwt = require('jsonwebtoken');
//verify the jwt toke of user middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication token is required' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};
//verify the role is Admin middleware
const authenticateAdmin = (req, res, next) => {
  
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

module.exports = { authenticateJWT, authenticateAdmin };
