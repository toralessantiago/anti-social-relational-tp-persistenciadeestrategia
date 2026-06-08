"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userNickname", as: "post" });
      Post.hasMany(models.Post_Image, {
        foreignKey: "postId",
        as: "postImages",
      });
      Post.hasMany(models.Comment, { foreignKey: "postId", as: "comments" });
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
      description: { type: DataTypes.STRING, allowNull: false },
      userNickname: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};
