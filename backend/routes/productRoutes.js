import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product successfully added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/delete/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(itemId);

    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
