const Post = require("../models/post-model");
const User = require("../models/user-model");
const auth = require("../auth");

createPost = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  const { title, tags, content } = req.body;

  if (!title || !tags || !content) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
  }

  User.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User not found." });
    }

    const ownerUserName = user.userName;
    const newPost = new Post({
      ownerUserName,
      title,
      tags,
      content,
    });
    user.posts.push(newPost);

    user.save().then(() => {
      newPost
        .save()
        .then(() => {
          return res.status(201).json({
            message: "Post created successfully!",
            post: newPost,
          });
        })
        .catch((err) => {
          return res.status(500).json({ errorMessage: err.message });
        });
    });
  });
};

module.exports = {
  createPost,
};
