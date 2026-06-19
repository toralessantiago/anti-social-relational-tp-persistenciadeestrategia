"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Post.hasMany(models.Post_Image, {
        foreignKey: "postId",
        as: "postImages",
      });

      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments",
      });

      Post.belongsToMany(models.Tag, {
        through: "PostTag",
        foreignKey: "postId",
        otherKey: "tagId",
        as: "tags",
      });
    }
  }

  Post.init(
    {
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  return Post;
};