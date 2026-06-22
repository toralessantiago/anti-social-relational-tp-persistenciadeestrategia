require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");
const YAML = require("js-yaml");
const swaggerUi = require("swagger-ui-express");
<<<<<<< HEAD

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

=======

const connectDB = require("./config/config");
>>>>>>> santi/users-followers
const routerUsers = require("./routes/userRoutes");
const routerFollowers = require("./routes/followerRoutes");
const routerComments = require("./routes/commentRoutes");
const routerTag = require("./routes/tagRoutes");
const routerPost = require("./routes/postsRoutes");

<<<<<<< HEAD
=======
const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, "swagger.yml"), "utf8")
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
>>>>>>> santi/users-followers
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", routerUsers);
app.use("/followers", routerFollowers);
app.use("/comments", routerComments);
app.use("/posts", routerPost);
app.use("/tags", routerTag);

const startServer = async () => {
  try {
    await connectDB();

<<<<<<< HEAD
    await db.sequelize.sync();

    console.log(`Servidor en http://localhost:${PORT}`);
    console.log(`Swagger en http://localhost:${PORT}/api-docs`);
  } catch (err) {
    console.error(err);
=======
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
      console.log(`Swagger en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Error iniciando servidor:", error);
>>>>>>> santi/users-followers
  }
};

startServer();