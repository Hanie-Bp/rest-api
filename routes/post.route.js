import { Router } from "express";
import {
  getAllPost,
  getAllPostsForUser,
  createPost,
  createPostforUser,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
const router = Router();


router.get("/", getAllPost);
router.get("/:userId",getAllPostsForUser);
router.post("/", createPost);
router.post("/:userId",createPostforUser);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
