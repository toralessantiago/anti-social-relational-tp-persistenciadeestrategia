const { User } = require("../models");
const userSchema = require("../schemas/userSchema");

// GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "nickName", "email", "password"],
    });

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
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "nickName", "email", "password"],
    });

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
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const user = await User.create(req.body);

    res.status(201).json({
      message: "Usuario creado con éxito.",
      data: {
        id: user.id,
        nickName: user.nickName,
        email: user.email,
        password: user.password,
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
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado.",
      });
    }

    await user.update(req.body);

    res.status(200).json({
      message: "Usuario actualizado con éxito.",
      data: {
        id: user.id,
        nickName: user.nickName,
        email: user.email,
        password: user.password,
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
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado.",
      });
    }

    await user.destroy();

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
