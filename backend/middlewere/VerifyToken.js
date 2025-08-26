const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization"); // Get the Authorization header
  const token = authHeader?.split(" ")[1]; // Extract the token part after 'Bearer '

  if (!token) {
    return res.status(403).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT); // Decode JWT token
    console.log("Decoded token:", decoded); // Debugging log
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    console.error("Token verification error:", err); // Debugging log
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { verifyToken };


