import User from "../models/User.js";
import { handleError } from "../error.js";

export const getLoggedInUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(handleError(404, "User not found"));
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (e) {
    next(e);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      next(handleError(401, "User not found"));
    }
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  } else {
    next(handleError(403, "Mismatch! You cannot perform this action"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (e) {
      next(e);
    }
    //should automatically log user out after account deletion (remove cookies)
  } else {
    next(handleError(403, "Mismatch! You cannot perform this action"));
  }
};

export const followUser = async (req, res, next) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current-user
    const currentUser = await User.findById(req.body.id);
    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({ $push: { followers: req.body.id } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
    } else {
      res.status(403).json("You're already following this user");
    }
    res.status(200).json("Following user");
  } catch (e) {
    next(e);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current-user
    const currentUser = await User.findById(req.body.id);
    if (currentUser.following.includes(req.params.id)) {
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      await user.updateOne({ $pull: { followers: req.body.id } });
    } else {
      res.status(403).json("You're not following this user");
    }
    res.status(200).json("Unfollowed user");
  } catch (e) {
    next(e);
  }
};
