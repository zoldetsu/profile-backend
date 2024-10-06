import express from "express";
import {
  AddPost,
  editPost,
  getAll,
  getOne,
  removePost,
} from "../controllers/Post.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/addpost", auth, AddPost);
router.get("/getposts", auth, getAll);
router.get("/getone", auth, getOne);
router.post("/editpost", auth, editPost);
router.delete("/deletepost", auth, removePost);

export default router;