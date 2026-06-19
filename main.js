require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");
const YAML = require("js-yaml");
const swaggerUi = require("swagger-ui-express");

const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;

const storagePath = process.env.DB_STORAGE || "./data/data.sqlite";
const dataDir = path.dirname(storagePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, "swagger.yml"), "utf8"),
);

const routerUsers = require("./routes/userRoutes");
const routerFollowers = require("./routes/followerRoutes");
const routerComments = require("./routes/commentRoutes");
const routerTag = require("./routes/tagRoutes");
const routerPost = require("./routes/postsRoutes");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    console.log(`Swagger en http://localhost:${PORT}/api-docs`);
  } catch (err) {
    console.error(err);
  }
});
