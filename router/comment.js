import express from "express";
import {
  createComment,
  likeComment,
  replyComment,
} from "../controller/comment.js";
import { auth } from "../middleware/authentication.js";
const router = express.Router();

router.post("/:id/comment", auth, createComment);
router.patch("/:id/likeComment", auth, likeComment);
router.post("/:idCom/replyComment/", auth, replyComment);
export default router;
