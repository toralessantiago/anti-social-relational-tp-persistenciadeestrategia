const mongoose = require("mongoose");

<<<<<<< HEAD
const dialect = process.env.DB_DIALECT || "sqlite";

const sqliteConfig = {
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "./data/data.sqlite",
};

const mysqlConfig = {
  dialect: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || "anti_social_db",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || null,
};

const dbConfig = dialect === "sqlite" ? sqliteConfig : mysqlConfig;

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
};
=======
<<<<<<< Updated upstream
module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || "./data/data.sqlite",
    host: process.env.DB_HOST || '127.0.0.1:80',
    port: process.env.DB_PORT || 3000,
    database: process.env.DB_NAME || 'anti_social_db',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null
  },
  test: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  production: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};
=======
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectada");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
>>>>>>> Stashed changes
>>>>>>> santi/users-followers
