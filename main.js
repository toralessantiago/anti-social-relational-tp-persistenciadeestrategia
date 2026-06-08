const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const routerUsers = require("./routes/userRoutes");
const routerFollowers = require("./routes/followerRoutes");
const routerTag = require("./routes/tagRoutes");
const routerPost = require("./routes/postsRoutes");

app.use(express.json());

app.use("/users", routerUsers);
app.use("/followers", routerFollowers);
app.use("/posts", routerPost);
app.use("/tags", routerTag);

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`Unahur - Anti-Social Net en http://localhost:${PORT}`);
});
