const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name } = decoded;
    req.user = { name };
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = authenticationMiddleware;
