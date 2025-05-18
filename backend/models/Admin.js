import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);
const adminModel = mongoose.model("Admin", adminSchema, "Admin");
export default adminModel;
