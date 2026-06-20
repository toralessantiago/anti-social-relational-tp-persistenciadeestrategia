const postSchema = require("../schemas/post.schema");
const imageSchema = require("../schemas/image.schema");
const updatePostSchema = require("../schemas/updatePost.schema");
const createPostSchema = require("../schemas/createPost.schema");
const { Post, Post_Image, User } = require("../models");

const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

const validatePostExists = async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) {
    return res.status(404).json({
      error: "Post no encontrado",
    });
  }

  req.post = post;

  next();
};

const validateCreatePost = (req, res, next) => {
  const { error } = createPostSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
};

const validateCreatePost = async (req, res, next) => {
  const { error } = createPostSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const { userId } = req.body;
  let user;

  if (typeof userId === "number") {
    user = await User.findByPk(userId);
  } else if (!Number.isNaN(Number(userId)) && String(userId).trim() !== "") {
    user = await User.findByPk(Number(userId));
  } else {
    user = await User.findOne({ where: { nickName: userId } });
  }

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  req.body.userId = user.id;
  next();
};

const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "ID inválido",
    });
  }

  next();
};

const validateImage = (req, res, next) => {
  const { error } = imageSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

const validateImageExists = async (req, res, next) => {
  const image = await Post_Image.findByPk(req.params.imageId);

  if (!image) {
    return res.status(404).json({
      error: "Imagen no encontrada",
    });
  }

  req.image = image;

  next();
};

module.exports = {
  validatePost,
  validatePostExists,
  validateId,
  validateImage,
  validateImageExists,
  validateCreatePost,
};
