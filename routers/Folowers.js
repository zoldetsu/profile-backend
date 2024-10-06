import express from "express";
import { Subscribe } from "../controllers/Folowers.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/subscribe/:id", auth, Subscribe);

export default router;
