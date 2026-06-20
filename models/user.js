"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: "userId",
        as: "posts",
      });
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comments",
      });
      User.belongsToMany(models.User, {
        through: "Follow",
        foreignKey: "followingId",
        as: "followers",
      });
      User.belongsToMany(models.User, {
        through: "Follow",
        foreignKey: "followerId",
        as: "following",
      });
    }
  }
  User.init(
    {
      nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
