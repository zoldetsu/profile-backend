import express from "express";
import multer from "multer";
import {
  getMe,
  getUserById,
  login,
  register,
  uptate,
} from "../controllers/Users.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
});

router.post("/upload", auth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.get("/getuser/:id", auth, getUserById);
router.put("/update/:id", auth, uptate);
export default router;
