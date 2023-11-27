// const auth = require("../auth");
const User = require("../models/user-model");
// const Map = require("../models/map-model");
// const Post = require("../models/post-model");

deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndDelete(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json(user);
  });
};

getUserById = async (req, res) => {
  const userId = req.params.userId;

  User.findById(userId).populate("posts").populate("maps").exec((err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User not found." });
    }

    return res.status(200).json(user);
  });
};

module.exports = {
  deleteUserById,
  getUserById,
};