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

export const Unsubscribe = async (req, res) => {
  const FollowId = req.params.id;
  console.log(FollowId);
  try {
    const Follow = await prisma.follows.delete({
      where: {
        id: FollowId,
      },
    });
    console.log(Follow);
    res.status(204).json("OK");
  } catch (err) {
    console.log(err);
  }
};
