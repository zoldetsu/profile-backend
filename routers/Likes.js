import express from "express";
import { likeIt, unLike } from "../controllers/Likes.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/like", auth, likeIt);
router.delete("/unlike/:id", auth, unLike);

export default router;
