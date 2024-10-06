import { prisma } from "../prisma/prisma-client.js";

export const Subscribe = async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  try {
    const follow = await prisma.follows.create({
      data: {
        followerId: followerId,
        followingId: followingId,
      },
    });
    res.status(200).json(follow);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось подписаться",
    });
  }
};

export const unsubscribe = async (req, res) => {
  const FollowId = req.body.id;

  try {
    const Follow = prisma.follows.delete({
      where: {
        id: FollowId,
      },
    });

    res.status(204).json("OK");
  } catch (err) {
    console.log(err);
  }
};
