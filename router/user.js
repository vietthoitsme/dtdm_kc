import express from "express";
import {
  editUser,
  follow,
  getUserById,
  searchUsers,
  getAllUser,
} from "../controller/user.js";
import { auth } from "../middleware/authentication.js";
const router = express.Router();

router.get("/search", searchUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", editUser);
router.patch("/user/:id/follow", auth, follow);
router.get("/userNotMe/:id", auth, getAllUser);

export default router;
