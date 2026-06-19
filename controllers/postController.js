const { Post, Post_Image, User, Tag } = require("../models");

//GET Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        "postImages",
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
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

  const post = await Post.findByPk(id, {
    include: [
      "postImages",
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });

  if (!post) {
    return res.status(404).json({
      error: "Post no encontrado",
    });
  }

  res.json(post);
};

//GET Post Images
const getPostImages = async (req, res) => {
  const images = await Post_Image.findAll({
    where: {
      postId: req.params.id,
    },
  });

  res.json(images);
};

//POST(el nickname toma un numero no un nombre)
// A corregir con mis compañeros(no tocar)
const createPost = async (req, res) => {
  try {
    const nuevoPost = await Post.create({
      descripcion: req.body.descripcion,
      userId: req.body.userId,
    });

    res.status(201).json(nuevoPost);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

//addImage
const addImage = async (req, res) => {
  const image = await Post_Image.create({
    url: req.body.url,
    postId: req.post.id,
  });

  res.status(201).json(image);
};

//PUT
const updatePost = async (req, res) => {
  await req.post.update({
    descripcion: req.body.descripcion,
  });

  res.json(req.post);
};

//DELETE
const deletePost = async (req, res) => {
  await req.post.destroy();

  res.json({
    message: "Post eliminado",
  });
};

//DELETE Image Post
const deleteImagePost = async (req, res) => {
  await req.image.destroy();

  res.json({
    message: "Imagen del post eliminada",
  });
};

// --- POSTTAG ---

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
