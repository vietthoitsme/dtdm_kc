import express from "express";
import {
  createPost,
  getPosts,
  likePost,
  getAllUserLikePost,
  deletePost,
  getPostByUser,
} from "../controller/posts.js";
import { auth } from "../middleware/authentication.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.patch("/:id/likePost", auth, likePost);
router.get("/:id/user", getAllUserLikePost);
router.delete("/:id", auth, deletePost);
router.get("/:id", getPostByUser);
export default router;
