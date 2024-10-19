import express from "express";
import { Subscribe, Unsubscribe } from "../controllers/Folowers.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/subscribe/:id", auth, Subscribe);
router.delete("/unsubscribe/:id", auth, Unsubscribe);

export default router;
