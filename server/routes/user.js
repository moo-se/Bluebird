import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getLoggedInUser,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//Get logged in user
router.get("/", verifyToken, getLoggedInUser);

//Get user
router.get("/find/:id", getUser);

//Update user
router.put("/:id", verifyToken, updateUser);

//Delete user
router.delete("/:id", verifyToken, deleteUser);

//Follow user
router.put("/follow/:id", followUser);

//Unfollow user
router.put("/unfollow/:id", verifyToken, unfollowUser);

export default router;
