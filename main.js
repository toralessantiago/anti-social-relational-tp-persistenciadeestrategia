const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const routerUsers = require("./routes/userRoutes");
const routerFollowers = require("./routes/followerRoutes");
const routerComments = require("./routes/commentRoutes");
const routerTag = require("./routes/tagRoutes");
const routerPost = require("./routes/postsRoutes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("js-yaml");
const fs = require("fs");
const swaggerDocument = YAML.load(fs.readFileSync("./swagger.yml", "utf8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.use("/users", routerUsers);
app.use("/followers", routerFollowers);
app.use("/comments", routerComments);
app.use("/posts", routerPost);
app.use("/tags", routerTag);

app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("DB conectada");

    await db.sequelize.sync();

    console.log(`Servidor en http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
