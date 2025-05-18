import express from "express";
import bcrypt from "bcrypt";
import adminModel from "../models/Admin.js";
import orderModel from "../models/orderModel.js";
import adminAuthMiddleware from "../middleWare/adminAuthMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // cookie expires in 7 days
    });

    // Set cookie
    res.cookie("adminToken", token, {
      httpOnly: true, // JS can't access it (safe)
      secure: true, // true if you use HTTPS
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/orders", adminAuthMiddleware, async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });

    res.json(orders); // send user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/orders/status", adminAuthMiddleware, async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    const order = await orderModel.findById(orderId);
    order.orderStatus = newStatus;
    await order.save();

    res.status(201).json(); // send user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", adminAuthMiddleware, async (req, res) => {
  const admin = await adminModel.findById(req.adminId);

  if (!admin) return res.status(404).json({ message: "admin not found" });
  res.status(200).json();
});
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
});
export default router;
