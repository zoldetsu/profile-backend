import express from "express";

import { auth } from "../middleware/auth.js";
import {
  addComment,
  removeComment,
  getCommnets,
} from "../controllers/Comments.js";

const router = express.Router();

router.post("/add", auth, addComment);
router.delete("/delete/:id", auth, removeComment);
router.get("/get/:id", auth, getCommnets);
export default router;
