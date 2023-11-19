const Post = require("../models/post-model");
const User = require("../models/user-model");
const auth = require("../auth");

getAllPosts = async (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!posts) {
      return res.status(404).json({ errorMessage: "Posts not found." });
    }

    return res.status(200).json(posts);
  });
};

module.exports = {
  getAllPosts,
};
