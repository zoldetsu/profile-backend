import { prisma } from "../prisma/prisma-client.js";

export const addComment = async (req, res) => {
  const text = req.body.text;
  const userId = req.user.id;
  const postId = req.body.postId;

  try {
    if (!postId) {
      return res.status(400).json({
        message: "отсутствует id post",
      });
    }
    const data = await prisma.comment.create({
      data: {
        text: text,
        userId: userId,
        postId: postId,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: "Не удалось добавить комментарий",
    });
  }
};

export const removeComment = async (req, res) => {
  const commentId = req.body.id;

  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    res.status(204).json("OK");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Ошибка в удалении комментария",
    });
  }
};
