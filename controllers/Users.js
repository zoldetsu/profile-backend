import { prisma } from "../prisma/prisma-client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "пожалуста заполните поля" });
    }

    const uniqueEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (uniqueEmail) {
      return res.status(400).json({
        message: "Этот емайл уже создан",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        ...user,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      res.status(400).json({
        message: "Не удалось создать пользователя",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: " Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Пожалуйста, заполните все поля",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        ...user,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Ошибка авторизации",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const body = req.user;

    const { hashedPassword, ...userData } = body;

    res.json(userData);
  } catch {
    res.status(400).json({
      message: "Ошибка авторизации",
    });
  }
};

