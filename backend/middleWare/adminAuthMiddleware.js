import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req, res, next) => {
  const tokenHeader = req.headers["x-admin-auth"];

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default adminAuthMiddleware;
