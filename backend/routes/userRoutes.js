import jwt from "jsonwebtoken";
import express from "express";
import usersModel from "../models/Users.js";
import bcrypt from "bcrypt";
import authMiddleware from "../middleWare/authMiddleware.js";

import orderModel from "../models/orderModel.js";
const router = express.Router();

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
      secure: false, // true if you use HTTPS
      sameSite: "lax",
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
      secure: false, // true if you use HTTPS
      sameSite: "lax",
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
    sameSite: "lax",
    secure: false,
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
  res.status(200).json({ user: { name: user.name, email: user.email } });
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

export default router;
