require("dotenv").config();

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
