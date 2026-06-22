const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
<<<<<<< HEAD
      nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
=======
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
>>>>>>> santi/users-followers
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);