import jwt from "jsonwebtoken";
import express from "express";
import usersModel from "../models/Users.js";
import bcrypt from "bcrypt";
import authMiddleware from "../middleWare/authMiddleware.js";
import { OAuth2Client } from "google-auth-library";

import orderModel from "../models/orderModel.js";
import { sendEmail } from "../utils/sendEmail.js";
const client = new OAuth2Client(process.env.CLIENT_ID);
const router = express.Router();

router.post("/auth/google", async (req, res) => {
  const { credential } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name } = payload;

  let user = await usersModel.findOne({ email });
  if (!user) {
    user = await usersModel.create({ name, email, password: "", cart: [] });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Google login successful" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist please signup" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // cookie expires in 7 days
    });

    // Set cookie
    res.cookie("token", token, {
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
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, cart } = req.body;
    const userExists = await usersModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists plese login instead" });
    }
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new usersModel({
      name,
      email,
      password: hashedPassword,
      cart,
    });

    const saved = await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // cookie expires in 7 days
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true, // JS can't access it (safe)
      secure: true, // true if you use HTTPS
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const user = await usersModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.cart.sort((a, b) => b.createdAt - a.createdAt)); // send user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/cart/add", authMiddleware, async (req, res) => {
  try {
    const { productId, name, price, size, imgUrl, quantity } = req.body;

    const user = await usersModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const itemExists = user.cart.find(
      (item) => item.productId === productId && item.size === size
    );
    if (itemExists) {
      itemExists.quantity += 1;
    } else {
      // Add to user's cart
      user.cart.push({
        productId,
        name,
        price,
        size,
        imgUrl,
        quantity,
      });
    }

    await user.save();

    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/cart/remove/:itemId", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await usersModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the item to be removed
    const newCart = user.cart.filter((item) => item._id.toString() !== itemId);

    user.cart = newCart;

    await user.save();

    res
      .status(200)
      .json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// PATCH /cart/update/:itemId
router.patch("/cart/update/:itemId", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await usersModel.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.cart.find((item) => item._id == req.params.itemId);
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await user.save();

    res.json({ message: "Quantity updated", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await usersModel.findById(req.userId);

  if (!user) return res.status(404).json({ message: "User not found" });
  res
    .status(200)
    .json({ user: { name: user.name, email: user.email, userId: req.userId } });
});

router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const order = await orderModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(order); // send user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/orders/add", authMiddleware, async (req, res) => {
  try {
    const {
      fName,
      lName,
      email,
      address,
      city,
      state,
      zipcode,
      country,
      phone,
      orderStatus,
      total,
      payment,
    } = req.body;

    const user = await usersModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = new orderModel({
      userId: user._id,
      fName,
      lName,
      email,
      address,
      city,
      state,
      zipcode,
      country,
      phone,
      ordersData: user.cart,
      orderStatus,
      total,
      payment,
    });

    await order.save();
    user.cart = [];
    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await usersModel.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reset Password - Bigby’s</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f6f6f6;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background-color: #0e1e2a; padding: 20px; text-align: center;">
      <img src="https://res.cloudinary.com/dpoxhiyts/image/upload/v1747544613/Logo_bwmx0x.png" alt="Bigby's Logo" style="max-width: 200px;" />

    </div>
    <div style="padding: 30px;">
      <h2 style="color: #0e1e2a;">Reset Your Password</h2>
      <p style="color: #333;">We received a request to reset your password. Click the button below to proceed.</p>
      <a href="${link}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background: linear-gradient(90deg, #fca311, #00b894); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      <p style="font-size: 14px; color: #777;">If you did not request this, you can safely ignore this email.</p>
    </div>
    <div style="background-color: #0e1e2a; color: #ccc; text-align: center; padding: 15px; font-size: 12px;">
      &copy; 2025 Bigby’s. All rights reserved.
    </div>
  </div>
</body>
</html>
`,
  });

  res.status(200).json({ message: "Reset link sent" });
});

// Handle reset
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(password, 10);
    await usersModel.findByIdAndUpdate(decoded.id, { password: hashed });

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

export default router;
