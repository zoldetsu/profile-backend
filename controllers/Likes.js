import { prisma } from "../prisma/prisma-client.js";

export const likeIt = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.user.id;

  if (!postId) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const existLike = await prisma.like.findFirst({
      where: { postId: postId, userId: userId },
      include: {
        post: true,
      },
    });

    if (existLike) {
      return res.status(400).json({
        error: "повторный запрос на лайк, при условии, что он уже поставлен",
      });
    }
    const like = await prisma.like.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });

    res.status(200).json(like);
  } catch {
    res.status(400).json({
      message: "Не удалось поставить лайк",
    });
  }
};

export const unLike = async (req, res) => {
  const likeId = req.params.id;
  try {
    const like = await prisma.like.delete({
      where: {
        id: likeId,
      },
    });

    res.status(200).json(like);
  } catch {
    res.status(400).json({
      message: "Не удалось поставить лайк",
    });
  }
};
