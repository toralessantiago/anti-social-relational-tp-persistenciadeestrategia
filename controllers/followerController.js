const { User } = require("../models");

//FOLLOW USER
const followUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    const user = await User.findByPk(userId);
    const targetUser = await User.findByPk(targetId);

    if (!user || !targetUser) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    await user.addFollowing(targetUser);

    res.json({
      message: "Usuario seguido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al seguir usuario",
    });
  }
};

//UNFOLLOW USER
const unfollowUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    const user = await User.findByPk(userId);
    const targetUser = await User.findByPk(targetId);

    if (!user || !targetUser) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    await user.removeFollowing(targetUser);

    res.json({
      message: "Usuario dejado de seguir",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al dejar de seguir usuario",
    });
  }
};

// GET FOLLOWERS (seguidores)
const getFollowers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const followers = await user.getFollowers({
      attributes: ["id", "nickName", "email", "password"],
      joinTableAttributes: [],
    });

    res.json(followers);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener followers",
    });
  }
};

// GET FOLLOWING (seguidos)
const getFollowing = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const following = await user.getFollowing({
      attributes: ["id", "nickName", "email", "password"],
      joinTableAttributes: [],
    });

    res.json(following);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener following",
    });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
