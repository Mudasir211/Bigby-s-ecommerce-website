import mongoose from "mongoose";
const reviewsArrSchema = mongoose.Schema({
  reviewTitle: { type: String, required: false },
  reviewDesc: { type: String, required: false },
  userName: { type: String, required: true },
  userId: { type: String, required: true },

  rating: { type: Number, required: true, min: 1, max: 5 },

  createdAt: {
    type: Date,
    default: Date.now, // Automatically set timestamp when item is added
  },
});
const reviewSchema = mongoose.Schema(
  {
    prodId: String,
    reviews: [reviewsArrSchema],
  },
  { timestamps: true }
);
const reviewModel = mongoose.model("reviews", reviewSchema, "reviews");
export default reviewModel;
