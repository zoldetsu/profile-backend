import express from "express";
import { likeIt, unLike } from "../controllers/Likes.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/likeit", auth, likeIt);
router.delete("/unlike", auth, unLike);

export default router;
