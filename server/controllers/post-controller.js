const Post = require("../models/post-model");
const User = require("../models/user-model");
const Comment = require("../models/comment-model");
const Subcomment = require("../models/subcomment-model");
const auth = require("../auth");

createPost = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  const { title, tags, content } = req.body;

  if (!title || !content || !tags) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
  }

  const trimmedTitle = title.replace(/(\s|\r\n|\n|\r)/gm, '');
  if(trimmedTitle.length === 0) {
    return res
      .status(400)
      .json({ errorMessage: "Post title must be entered with at least one non-space characters!" });
  }

  const trimmedContent = content.replace(/(\s|\r\n|\n|\r)/gm, '');
  if(trimmedContent.length === 0) {
    return res
      .status(400)
      .json({ errorMessage: "Post content must be entered with at least one non-space characters!" });
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
      return res.status(404).json({ errorMessage: "Post not found." });
    }

    return res.status(200).json(post);
  });
};

updatePostById = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  const userId = req.userId;
  const postId = req.params.postId;

  if(!userId){
    return res.status(400).json({ errorMessage: "No user ID found." });
  }
  if(!postId){
    return res.status(400).json({ errorMessage: "No post ID found." });
  }

  const { title, content, tags } = req.body;

  if(!title || !content || !tags){
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
  }

  Post.findById(postId, (err, post) => {
    if(err){
      return res.status(500).json({ errorMessage: err.message });
    }
    else if(!post){
      return res.status(404).json({ errorMessage: "Post not found." });
    }

    async function asyncUpdateUserPost(post){
      User.findById(userId, (err, user) => {
        if(err){
          return res.status(500).json({ errorMessage: err.message });
        }
        else if(!user){
          return res.status(404).json({ errorMessage: "User not found." });
        }
        else if(user.userName !== post.ownerUserName){
          return res.status(500).json({ errorMessage: "Username unmatched. User cannot update other users' post." });
        }

        post.title = title;
        post.content = content;
        post.tags = tags;
    
        post.save()
        .then(() => {
          return res.status(201).json({
            message: "Post updated successfully!",
            post: post
          });
        })
        .catch((err) => {
          return res.status(500).json({ errorMessage: err.message });
        });
      });
    }

    asyncUpdateUserPost(post);
  });
};

deletePostById = async (req, res) => {
  const postId = req.params.postId;
  if (!postId) {
    return res.status(400).json({ errorMessage: "No post ID found." });
  }

  Post.findById(postId, (err, post) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    else if(!post){
      return res.status(404).json({ errorMessage: "Post not found." });
    }

    async function findUser() {
      await User.findOne({ userName: post.ownerUserName }, (err, user) => {
        if (err) {
          return res.status(500).json({ errorMessage: err.message });
        } else if (!user) {
          return res.status(404).json({ errorMessage: "User not found." });
        }
        else if(user.userName !== post.ownerUserName){
          return res.status(500).json({ errorMessage: "Username unmatched. User cannot delete other users' post." });
        }

        user.posts.pull(postId);
        user.save().then(() => {
          post
            .remove()
            .then(() => {
              return res.status(200).json({
                message: "Post deleted successfully!",
                post: post,
              });
            })
            .catch((err) => {
              return res.status(500).json({ errorMessage: err.message });
            });
        });
      });
    }

    findUser();
  });
};

deleteCommentById = async (req, res) => {
  const commentId = req.params.commentId;
  if(!commentId){
    return res.status(400).json({ errorMessage: "No comment ID found." });
  }

  Comment.findById(commentId, (err, comment) =>{
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    async function findPost(){
      try{
        const post = await Post.findOne({comments: commentId});
        if (!post){
          return res.status(404).json({ errorMessage: 'Post not found.' });
        }

        post.comments.pull(commentId);
        await post.save();
        await comment.remove();

        return res.status(200).json({
          message: 'Comment deleted successfully!',
          comment: comment,
        });

      } catch(err) {
        return res.status(500).json({errorMessage: err.message});
      }
    }

    findPost();
  })
};

deleteSubCommById = async (req, res) => {
  const subId = req.params.subId;
  if(!subId){
    return res.status(400).json({ errorMessage: "No comment ID found." });
  }

  Subcomment.findById(subId, (err, subcomment) =>{
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    async function findComment(){
      try{
        const comment = await Comment.findOne({subComments: subId});
        if (!comment){
          return res.status(404).json({ errorMessage: 'Comment not found.' });
        }

        comment.subComments.pull(subId);
        await comment.save();
        await subcomment.remove();

        return res.status(200).json({
          message: 'subcomment deleted successfully!',
          comment: subcomment,
        });

      } catch(err) {
        return res.status(500).json({errorMessage: err.message});
      }
    }

    findComment();
  })
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
      type: 'post',
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
  let idLists = req.params.idLists;
  if(!idLists){
    return res.status(404).json({ errorMessage: "Comments list not found" });
  }

  console.log(typeof idLists);
  console.log(idLists);

  idLists = idLists.split(",");

  Comment.find({ _id: { $in: idLists } })
    .populate("subComments")
    .exec((err, comments) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      } else if (!comments) {
        return res.status(404).json({ errorMessage: "Comments not found" });
      }

      return res.status(200).json(comments);
    });
};

getSubcommsByParentCommsId = async (req, res) => {
  let parentId = req.params.parentId;
  if(!parentId){
    return res.status(404).json({ errorMessage: "Comment ID not found" });
  }

  Comment.findById(parentId, (err, comment) => {
    if(err){
      return res.status(500).json({ errorMessage: err.message });
    }
    else if(!comment){
      return res.status(404).json({ errorMessage: "Comment with given ID not found" });
    }

    const subCommentList = comment.subComments;
    if(!subCommentList){
      return res.status(404).json({ errorMessage: "Subcomment(s) not found from given comment" });
    }

    Subcomment.find({ _id: { $in: subCommentList }} , (err, subcomments) => {
      if(err){
        return res.status(500).json({ errorMessage: err.message });
      }
      else if(!subcomments){
        return res.status(404).json({ errorMessage: "Subcomment(s) not found" });
      }
      return res.status(200).json(subcomments);
    });
  });
};

createSubcomment = async (req, res) => {
  const commentId = req.params.commentId;
  const { commenterUserName, content } = req.body;

  Comment.findById(commentId, (err, comment) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!comment) {
      return res.status(404).json({ errorMessage: "Comment not found" });
    }

    const newSubcomment = new Subcomment({
      commenterUserName: commenterUserName,
      content: content,
    });

    comment.subComments.push(newSubcomment);
    comment.save().then(() => {
      newSubcomment.save().then(() => {
        return res.status(201).json({
          message: "Subcomment created successfully!",
          subcomment: newSubcomment,
        });
      });
    });
  });
};

module.exports = {
  createPost,
  getPostsByPostIds,
  deletePostById,
  updatePostById,
  createComment,
  getPostById,
  getCommentsByCommentIds,
  createSubcomment,
  deleteCommentById,
  deleteSubCommById,
  getSubcommsByParentCommsId
};
