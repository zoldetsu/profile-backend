import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma-client.js";

export const auth = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
          include: {
            followers: true,
            following: true,
          },
        });
        req.user = user;
        next();
      } catch {
        return res.status(403).json({
          message: "Нет доступа",
        });
      }
    } else {
      return res.status(403).json({
        message: "Вы не авторизованы",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Не авторизован",
    });
  }
};
