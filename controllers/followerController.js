const { User } = require("../models");

// FOLLOW USER
const followUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    if (userId === targetId) {
      return res.status(400).json({
        error: "Un usuario no puede seguirse a sí mismo",
      });
    }

    const user = await User.findByPk(userId);
    const targetUser = await User.findByPk(targetId);

    if (!user || !targetUser) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const alreadyFollowing = await user.hasFollowing(targetUser);

    if (alreadyFollowing) {
      return res.status(400).json({
        error: "Ya sigues a este usuario",
      });
    }

    await user.addFollowing(targetUser);

    return res.json({
      message: "Usuario seguido correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al seguir usuario",
    });
  }
};

// UNFOLLOW USER
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

    const isFollowing = await user.hasFollowing(targetUser);

    if (!isFollowing) {
      return res.status(400).json({
        error: "No sigues a este usuario",
      });
    }

    await user.removeFollowing(targetUser);

    return res.json({
      message: "Usuario dejado de seguir",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al dejar de seguir usuario",
    });
  }
};

// GET FOLLOWERS
const getFollowers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const followers = await user.getFollowers({
      attributes: ["id", "nickName", "email"],
      joinTableAttributes: [],
    });

    return res.json(followers);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener followers",
    });
  }
};

// GET FOLLOWING
const getFollowing = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const following = await user.getFollowing({
      attributes: ["id", "nickName", "email"],
      joinTableAttributes: [],
    });

    return res.json({
      data: following,
    });
  } catch (error) {
    return res.status(500).json({
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
