const { Comment, User, Post } = require("../models");
const { Op } = require('sequelize');

const obtenerComentarios = async (req, res) => {
  try {
    await Comment.update(
      { visible: false },
      { where: { createdAt: { [Op.lt]: req.cutoffDate } } }
    )

    const comentarios = await Comment.findAll({
      where: { visible: true }, 
      attributes: ["id", "content", "userId", "postId"],
      include: [
        { model: User, as: "user", attributes: ['nickName', 'email'] },
        { model: Post, as: "post", attributes: ['id', 'descripcion'] },
      ],
    });
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentarios." });
  }
};


const crearComentario = async (req, res) => {
  try {
    const { content, userId, postId, createdAt } = req.body;

    const comentario = await Comment.create({
      content,
      userId,
      postId,
      visible: true,
      createdAt
    });
    res.status(201).json(comentario);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el comentario." });
  }
};

const actualizarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comentario = req.comentario;
    await comentario.update({ content });
    res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({
          error: "Error al actualizar el comentario",
    });
  }
};

const eliminarComentario = async (req, res) => {
  try {
    const comentario = req.comentario;
    await comentario.destroy();
    res.status(200).json({
      message: "Comentario eliminado correctamente",
    });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el comentario",
      });
    }
};


module.exports = {
  obtenerComentarios,
  crearComentario,
  actualizarComentario,
  eliminarComentario
};
