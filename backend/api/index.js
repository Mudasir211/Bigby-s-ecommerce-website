import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import productRoutes from "../routes/productRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import reviewRoutes from "../routes/reviewRoutes.js";

dotenv.config();

const app = express();

// ✅ Allowed frontend domains (add localhost if testing locally)
const allowedOrigins = [
  "https://bigby-s-ecommerce-website.vercel.app",
  "http://localhost:5173", // optional: for local dev
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Express server is running on Vercel");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("✅ MongoDB connected to 'Products' database");
  })
  .catch((err) => console.error("❌ Mongo error:", err));

// ✅ Start the server (Vercel will auto-pick this)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
