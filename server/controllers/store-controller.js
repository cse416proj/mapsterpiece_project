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

getAllComments = async (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!comments) {
      return res.status(404).json({ errorMessage: "Comments not found." });
    }

    return res.status(200).json(comments);
  });
};

getAllUsers = async (req, res) => {
  // find all users and also populate the posts array

  User.find({})
    .populate("posts")
    .exec((err, users) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }

      return res.status(200).json(users);
    });
  // User.find({}, (err, users) => {
  //   if (err) {
  //     return res.status(500).json({ errorMessage: err.message });
  //   } 
  //   return res.status(200).json(users);
  // });
};

// // guest can load all users' published maps, so no auth
// getAllMaps = async (req, res) => {
//   Maps.find({isPublished: true}, (err, maps) => {
//     if(err){
//       return res.status(500).json({ errorMessage: err.message });
//     }
//     else if(!maps){
//       return res.status(404).json({ errorMessage: "Published maps not found." });
//     }

//     return res.status(200).json({
//       success: true,
//       maps: publishedMaps
//     });
//   })
//   .catch((error) => {
//     return res.status(400).json({
//       error,
//       errorMessage: "Failed to get all published maps, please try again."
//     });
//   });
// }

module.exports = {
  getAllPosts,
  getAllUsers,
  getAllComments,
  // getAllMaps
};
