import express from "express";
import {
  getFollowers,
  getFollowing,
  Subscribe,
  Unsubscribe,
} from "../controllers/Folowers.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/subscribe/:id", auth, Subscribe);
router.get("/getfollowing/:id", auth, getFollowing);
router.get("/getfollowers/:id", auth, getFollowers);
router.delete("/unsubscribe/:id", auth, Unsubscribe);

export default router;
