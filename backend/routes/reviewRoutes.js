import authMiddleware from "../middleWare/authMiddleware.js";
import reviewModel from "../models/Review.js";
import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { prodId } = req.query;
    const reviews = await reviewModel.findOne({ prodId });
    if (!reviews) {
      return res.status(400).json({ message: "invalid product id" });
    }
    res.status(201).json(reviews); // send user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { prodId, userName, reviewTitle, reviewDesc, rating } = req.body;

    if (!prodId || !userName || rating == null) {
      return res
        .status(400)
        .json({ message: "prodId, userName and rating are required" });
    }

    let reviewsDoc = await reviewModel.findOne({ prodId });

    const newReview = {
      userName,
      reviewTitle,
      reviewDesc,
      rating,
      userId: req.userId,
    };

    if (!reviewsDoc) {
      // No reviews yet for this product, create new doc
      reviewsDoc = new reviewModel({
        prodId,
        reviews: [newReview],
      });
    } else {
      reviewsDoc.reviews = reviewsDoc.reviews.filter(
        (review) => review.userId !== req.userId
      );
      // Push to existing reviews array
      reviewsDoc.reviews.push(newReview);
    }

    await reviewsDoc.save();
    res.status(201).json(reviewsDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:prodId", authMiddleware, async (req, res) => {
  try {
    const { prodId } = req.params;

    if (!prodId) {
      return res
        .status(400)
        .json({ message: "prodId, userName and rating are required" });
    }

    let reviewsDoc = await reviewModel.findOne({ prodId });

    reviewsDoc.reviews = reviewsDoc.reviews.filter(
      (review) => review.userId !== req.userId
    );

    await reviewsDoc.save();
    res.status(201).json(reviewsDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
