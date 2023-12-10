import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrUnlikeTweet,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
} from "../controllers/tweet.js";

const router = express.Router();

//Create tweet
router.post("/", verifyToken, createTweet);

//Delete tweet
router.delete("/:id", verifyToken, deleteTweet);

//Like or unlike tweet
router.put("/:id/likes", likeOrUnlikeTweet);

//Get all timeline tweet
router.get("/timeline/:id", getAllTweets);

//Get user tweets only
router.get("/user/all/:id", getUserTweets);

//Get explore tweets
router.get("/explore", getExploreTweets);

export default router;
