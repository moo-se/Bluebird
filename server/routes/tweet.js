import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrUnlikeTweet,
} from "../controllers/tweet.js";

const router = express.Router();

//Create tweet
router.post("/", verifyToken, createTweet);

//Delete tweet
router.delete("/:id", verifyToken, deleteTweet);

//Like or unlike tweet
router.put("/:id/likes", likeOrUnlikeTweet);

export default router;
