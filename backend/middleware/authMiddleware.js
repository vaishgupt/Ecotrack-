const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized - No token provided"
      });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token format"
      });
    }

    const decoded = jwt.verify(token, process.env.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ 
      message: "Invalid or expired token",
      error: err.message 
    });
  }
};

module.exports = authMiddleware;
