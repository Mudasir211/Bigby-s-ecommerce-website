import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: [String],
    category: String,
    subCategory: String,
    sizes: [String],
    bestseller: Boolean,
  },
  { timestamps: true }
);

// ⬅️ Note: explicitly bind to 'Products' collection
const Product = mongoose.model("Product", productSchema, "Products");

export default Product;
