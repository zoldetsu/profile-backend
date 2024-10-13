import express from "express";
import routerUser from "./routers/Users.js";
import routerPost from "./routers/Posts.js";
import routerComment from "./routers/Comments.js";
import routerFollower from "./routers/Folowers.js";
import routerLike from "./routers/Likes.js";
import donenv from "dotenv";

import cors from "cors";
const app = express();
donenv.config();

async function main() {
  app.use(express.json());
  app.use(cors());
  app.use("/uploads", express.static("uploads"));
  app.use("/api/user", routerUser);
  app.use("/api/post", routerPost);
  app.use("/api/comment", routerComment);
  app.use("/api/profile", routerFollower);
  app.use("/api/likes", routerLike);
  app.listen("4000", () => {
    console.log("server ok");
  });
}

main();
