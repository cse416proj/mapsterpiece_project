const Post = require("../models/post-model");
const User = require("../models/user-model");
const Comment = require("../models/comment-model");
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

getPostsByPostIds = async (req, res) => {
  let idList = req.params.idLists;
  idList = idList.split(",");
  if (!idList) {
    return [];
  }

  Post.find({ _id: { $in: idList } }, (err, posts) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!posts) {
      return res.status(404).json({ errorMessage: "Posts not found." });
    }

    return res.status(200).json(posts);
  });
};

getPostById = async (req, res) => {
  const postId = req.params.postId;

  Post.findById(postId, (err, post) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!post) {
      return res.status(404).json({ errorMessage: "Post not found" });
    }

    return res.status(200).json(post);
  });
};

deletePostById = async (req, res) => {
  const postId = req.params.postId;
  if (!postId) {
    return res.status(400).json({ errorMessage: "No post ID found." });
  }

  Post.findByIdAndDelete(postId, (err, post) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!post) {
      return res.status(404).json({ errorMessage: "Post not found." });
    }

    return res.status(200).json(post);
  });
};

createComment = async (req, res) => {
  const postId = req.params.postId;
  const { commenterUserName, content } = req.body;

  Post.findById(postId, (err, post) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!post) {
      return res.status(404).json({ errorMessage: "Post not found" });
    }

    const newComment = new Comment({
      commenterUserName: commenterUserName,
      content: content,
    });

    post.comments.push(newComment);
    post.save().then(() => {
      newComment.save().then(() => {
        return res.status(201).json({
          message: "Comment created successfully!",
          comment: newComment,
        });
      });
    });
  });
};

getCommentsByCommentIds = async (req, res) => {
  let idList = req.params.idLists;
  if (!idList) {
    return [];
  }

  idList = idList.split(",");

  Comment.find({ _id: { $in: idList } }, (err, comments) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!comments) {
      return res.status(404).json({ errorMessage: "Comments not found" });
    }

    return res.status(200).json(comments);
  });
};

module.exports = {
  createPost,
  getPostsByPostIds,
  deletePostById,
  createComment,
  getPostById,
  getCommentsByCommentIds,
};
