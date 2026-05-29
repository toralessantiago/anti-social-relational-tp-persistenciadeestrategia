const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const routerUsers = require("./routes/userRoutes");
const routerFollowers = require("./routes/followerRoutes");

app.use(express.json());

app.use("/users", routerUsers);
app.use("/followers", routerFollowers);

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`Unahur - Anti-Social Net en http://localhost:${PORT}`);
});
