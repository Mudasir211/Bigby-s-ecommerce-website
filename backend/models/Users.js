import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    cart: [
      {
        productId: String,
        name: String,
        price: Number,
        size: String,
        imgUrl: String,
        quantity: Number,
        createdAt: {
          type: Date,
          default: Date.now, // Automatically set timestamp when item is added
        },
      },
    ],
  },
  { timestamps: true }
);
const usersModel = mongoose.model("users", usersSchema, "users");
export default usersModel;
