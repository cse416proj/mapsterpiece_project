const User = require("../models/user-model");
const auth = require("../auth");

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

  User.findById(userId, (err, user) => {
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