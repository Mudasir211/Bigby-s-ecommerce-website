import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req, res, next) => {
  const token = req.cookies.adminToken; // getting cookie

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use same secret everywhere
    req.adminId = decoded.id; // store user's id on request
    next(); // move to next
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default adminAuthMiddleware;
