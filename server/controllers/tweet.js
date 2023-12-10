import Tweet from "../models/Tweet.js";
import User from "../models/User.js";
import { handleError } from "../error.js";

export const createTweet = async (req, res, next) => {
  try {
    const newTweet = new Tweet(req.body);
    const savedTweet = await newTweet.save();
    return res.status(200).json(savedTweet);
  } catch (e) {
    next(handleError(500, e));
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.body.id) {
      await tweet.deleteOne();
      return res.status(200).json("Tweet deleted");
    }
  } catch (e) {
    next(handleError(500, e));
  }
};

export const likeOrUnlikeTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      return res.status(200).json("Tweet liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      return res.status(200).json("Tweet unliked");
    }
  } catch (e) {
    next(handleError(500, e));
  }
};

export const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promise.all(
      currentUser.following.map((id) => {
        return Tweet.find({ userId: id });
      })
    );
    // console.log(followersTweets);
    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (e) {
    next(handleError(500, e));
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userTweets);
  } catch (e) {
    next(handleError(500, e));
  }
};

export const getExploreTweets = async (req, res, next) => {
  try {
    const exploreTweets = await Tweet.find({ likes: { $exists: true } }).sort({
      likes: -1,
    });
    res.status(200).json(exploreTweets);
  } catch (e) {
    next(handleError(500, e));
  }
};
