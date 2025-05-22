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
      expiresIn: "7d",
    });

    // Send token in JSON response instead of cookie
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/orders", adminAuthMiddleware, async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/orders/status", adminAuthMiddleware, async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = newStatus;
    await order.save();

    res.status(201).json({ message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", adminAuthMiddleware, async (req, res) => {
  try {
    const admin = await adminModel.findById(req.adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({
      id: admin._id,
      email: admin.email,
      // other info you want to send
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout endpoint is just a success message — frontend handles clearing localStorage
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
