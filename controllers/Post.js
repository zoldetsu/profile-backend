import { prisma } from "../prisma/prisma-client.js";

export const AddPost = async (req, res) => {
  try {
    const arrText = req.body.text;

    const post = await prisma.post.create({
      data: {
        text: arrText,
        userId: req.user.id,
      },
      include: {
        likes: true,
        user: true,
        createdComment: true,
      },
    });

    return res.status(201).json(post);
  } catch {}
};

export const editPost = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data,
    });
    res.status(204).json("OK");
  } catch (err) {
    res.status(500).json({
      message: "Не удолось отредактировать пост",
    });
  }
};

export const removePost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.delete({
      where: { id },
    });

    res.status(204).json(post);
  } catch (err) {
    return res.status(500).json({
      message: "Не удалось удалить пост",
    });
  }
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const post = await prisma.post.findFirst({
      where: { id },
      include: {
        likes: true,
        user: true,
        createdComment: true,
      },
    });

    const postWithLike = {
      ...post,
      likedByUser: post.likes.some((like) => like.userId === userId),
    };
    res.status(200).json(postWithLike);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить пост",
    });
  }
};

export const getAll = async (req, res) => {
  const userId = req.user.id;
  try {
    const posts = await prisma.post.findMany({
      include: {
        likes: true,
        user: true,
        createdComment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const postWithLike = posts.map((post) => ({
      ...post,
      likedByUser: post.likes.some((like) => like.userId === userId),
    }));
    res.status(200).json(postWithLike);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить посты",
    });
  }
};
