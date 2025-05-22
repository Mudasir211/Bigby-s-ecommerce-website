import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Expect token in Authorization header as: "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const token = authHeader.split(" ")[1]; // extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // store user's id on request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
