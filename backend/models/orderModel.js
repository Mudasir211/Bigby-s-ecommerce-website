import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: String,
    fName: String,
    lName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipcode: Number,
    country: String,
    phone: Number,
    ordersData: [Object],
    orderStatus: String,
    total: Number,
    payment: String,
  },
  { timestamps: true }
);
const orderModel = mongoose.model("orders", orderSchema, "orders");
export default orderModel;
