import express from "express";

import { auth } from "../middleware/auth.js";
import { addComment, removeComment } from "../controllers/Comments.js";

const router = express.Router();

router.post("/add", auth, addComment);
router.delete("/delete", auth, removeComment);
export default router;
