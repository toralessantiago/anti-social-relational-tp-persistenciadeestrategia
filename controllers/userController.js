<<<<<<< HEAD
const { User, Post, Comment } = require("../models");
const userSchema = require("../schemas/userSchema");
=======
const User = require("../models/User");
>>>>>>> santi/users-followers

// GET USERS
const getUsers = async (req, res) => {
  try {
<<<<<<< HEAD
    const users = await User.findAll({
      attributes: ["id", "nickname", "email"],
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "description"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "content", "postId"],
        },
      ],
    });
=======
    const users = await User.find().select("_id nickName email");
>>>>>>> santi/users-followers

    res.status(200).json({
      message: "Usuarios obtenidos con éxito.",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener usuarios.",
    });
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  try {
<<<<<<< HEAD
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "nickName", "email"],
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "description"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "content", "postId"],
        },
      ],
    });
=======
    const user = await User.findById(req.params.id).select(
      "_id nickName email"
    );
>>>>>>> santi/users-followers

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado.",
      });
    }

    res.status(200).json({
      message: "Usuario obtenido con éxito.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener usuario.",
    });
  }
};

// CREATE USER
const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      nickName: req.body.nickName,
    });

    if (existingUser) {
      return res.status(400).json({
        error: "El nickname ya existe.",
      });
    }

    const user = await User.create(req.body);

    res.status(201).json({
      message: "Usuario creado con éxito.",
      data: {
<<<<<<< HEAD
        id: user.id,
        nickname: user.nickname,
=======
        id: user._id,
        nickName: user.nickName,
>>>>>>> santi/users-followers
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear usuario.",
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado.",
      });
    }

    if (req.body.nickName) {
      const existingUser = await User.findOne({
        nickName: req.body.nickName,
      });

      if (
        existingUser &&
        existingUser._id.toString() !== user._id.toString()
      ) {
        return res.status(400).json({
          error: "El nickname ya existe.",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Usuario actualizado con éxito.",
      data: {
<<<<<<< HEAD
        id: user.id,
        nickname: user.nickname,
        email: user.email,
=======
        id: updatedUser._id,
        nickName: updatedUser.nickName,
        email: updatedUser.email,
>>>>>>> santi/users-followers
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar usuario.",
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado.",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Usuario eliminado con éxito.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar usuario.",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
