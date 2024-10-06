import { prisma } from "../prisma/prisma-client.js";

export const likeIt = async (req, res) => {
  const postId = req.body?.id;
  const userId = req.user?.id;

  try {
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
  const likeId = req.body.id;
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
