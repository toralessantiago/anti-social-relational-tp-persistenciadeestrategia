const { Post, Post_Image, User, Tag } = require("../models");

//GET Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "nickName"] },
        "postImages",
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "nickname", "email"],
        },
      ],
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//GET Post(ID)
const getPostId = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const post = await Post.findByPk(id, {
      include: [
        "postImages",
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "nickname", "email"],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({
        error: "Post no encontrado",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//GET Post Images
const getPostImages = async (req, res) => {
  try {
    const images = await Post_Image.findAll({
      where: {
        postId: req.params.id,
      },
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//POST
const createPost = async (req, res) => {
  try {
    const nuevoPost = await Post.create({
      description: req.body.description,
      userId: req.body.userId,
    });

    res.status(201).json(nuevoPost);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//addImage
const addImage = async (req, res) => {
  try {
    const image = await Post_Image.create({
      url: req.body.url,
      postId: req.post.id,
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//PUT
const updatePost = async (req, res) => {
  try {
    await req.post.update({
      description: req.body.description,
    });

    res.json(req.post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//DELETE
const deletePost = async (req, res) => {
  try {
    await req.post.destroy();

    res.json({
      message: "Post eliminado",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//DELETE Image Post
const deleteImagePost = async (req, res) => {
  try {
    await req.image.destroy();

    res.json({
      message: "Imagen del post eliminada",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// --- POST TAG ---

//POST Assign Tags
const assignTags = async (req, res) => {
  try {
    const post = req.post;
    const { tagsIds } = req.body;
    const tags = await Tag.findAll({
      where: {
        id: tagsIds,
      },
    });

    await post.setTags(tags);
    res.status(200).json({ message: "Tags asignados al post correctamente" });
  } catch (error) {
    res.status(500).json({
      error: "Error al asignar tags en el post",
    });
  }
};

//POST Associate Tag
const associateTag = async (req, res) => {
  try {
    const post = req.post;
    const { tagId } = req.params;

    await post.addTag(tagId);
    res.status(200).json({ message: "Tag asociado al post correctamente" });
  } catch (error) {
    res.status(500).json({
      error: "Error al asociar el tag en el post",
    });
  }
};

//DELETE
const dissociateTag = async (req, res) => {
  try {
    const post = req.post;
    const { tagId } = req.params;

    await post.removeTag(tagId);
    res.status(200).json({
      message: "Tag desasociado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al desasociar el tag del post",
    });
  }
};

module.exports = {
  getPosts,
  getPostId,
  createPost,
  addImage,
  updatePost,
  deletePost,
  deleteImagePost,
  getPostImages,

  assignTags,
  associateTag,
  dissociateTag,
};
