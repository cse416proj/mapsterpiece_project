const Map = require("../models/map-model");
const User = require("../models/user-model");
const auth = require("../auth");
const Comment = require("../models/comment-model");
const Subcomment = require("../models/subcomment-model");

createMap = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  const userId = req.userId;
  const { ownerUserName, title, fileFormat, mapType, mapContent, tags } = req.body;

  // check user existence & payload
  if (!userId) {
    return res.status(400).json({ errorMessage: "User does not exist." });
  }

  if (!ownerUserName || !title || !fileFormat || !mapContent || !tags) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields!" });
  }

  const trimmedTitle = title.replace(/(\s|\r\n|\n|\r)/gm, '');
  if(trimmedTitle.length === 0) {
    return res
      .status(400)
      .json({ errorMessage: "Title must be entered with at least one non-space characters!" });
  }

  const features = mapContent.features;
  if (!features) {
    return res.status(400).json({ errorMessage: "Feature does not exist." });
  }

  // use regex to parse properties we want
  let featuresFiltered = [];
  const nameRegex = /^NAME(_[0-3])?$/i;

  for (let i = 0; i < features.length; i++) {
    const currFeature = features[i];
    if (currFeature.properties) {
      let newProperties = {};
      const propKeys = Object.keys(currFeature.properties);

      // come back later, to be removed
      const newPropKeys = propKeys.filter((property) =>
        nameRegex.test(property)
        // (nameRegex.test(property) || property === 'gdp_md')
      );

      // keep properties we want
      newPropKeys.forEach((property) => {
        newProperties[property.toLowerCase()] =
          currFeature.properties[property];
      });
      currFeature.properties = newProperties;
    }

    featuresFiltered[i] = currFeature;
  }

  // create map
  const newMap = new Map({
    ownerUserName,
    title,
    fileFormat,
    mapType: mapType,
    mapContent: featuresFiltered,
    mapTypeData: {
      bubbleMapColor: '#FF0000',
      legendTitle: 'Default legend title',
      max: 0,
      data: []
    },
    tags,
    isPublished: false,
  });
  if (!newMap) {
    return res.status(400).json({
      success: false,
      errorMessage: "Create Map failed, please try again.",
    });
  }

  console.log('map is created');

  // find user by id & add new map to their map collection
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User cannot be found." });
    } else if (user.userName !== ownerUserName) {
      return res.status(500).json({ errorMessage: "Username does not match" });
    }

    console.log('user found');
    user.maps.push(newMap);

    newMap
      .save()
      .then(() => {
        user
        .save()
        .then(() => {
          console.log("success");
          return res.status(201).json({
            success: true,
            map: newMap,
            message: "A new map has been created successfully!",
            });
        })
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          error,
          errorMessage: "Failed to create map, please try again.",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          errorMessage: "Failed to create user's map, please try again.",
        });
      });
  });
};

getMapById = async (req, res) => {
  const mapId = req.params.id;

  if (!mapId) {
    return res.status(400).json({ errorMessage: "Map ID does not exist." });
  }

  Map.findById(mapId)
    .populate("comments")
    .exec((err, map) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      } else if (!map) {
        return res.status(404).json({ errorMessage: "Map is not found." });
      }
      return res.status(200).json({
        success: true,
        map: map,
      });
    });
};

deleteMapById = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  // check user & map existence
  const userId = req.userId;
  const mapId = req.params.id;

  if (!userId) {
    return res.status(400).json({ errorMessage: "User does not exist." });
  }
  if (!mapId) {
    return res.status(400).json({ errorMessage: "Map ID does not exist." });
  }

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User cannot be found." });
    }
    user.maps = user.maps.filter((map) => String(map) !== String(mapId));

    user
      .save()
      .then(() => {
        console.log(user);

        Map.findByIdAndDelete(mapId, (err, mapToDelete) => {

          if (err) {
            return res.status(500).json({ errorMessage: err.message });
          } else if (!mapToDelete) {
            return res.status(404).json({ errorMessage: "Map is not found." });
          }

          console.log(mapToDelete);

          return res.status(200).json({
            success: true,
            map: mapToDelete,
          });
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          errorMessage: "Failed to save user's map, please try again.",
        });
      });
  });
};

// getAllMapsFromCurrentUser = async (req, res) => {
//   if (auth.verifyUser(req) === null) {
//     return res.status(401).json({
//       errorMessage: "Unauthorized",
//     });
//   }

//   // check user existence
//   const userId = req.userId;
//   if (!userId) {
//     return res.status(400).json({ errorMessage: "User does not exist." });
//   }

//   console.log(`Now getting maps from user ${userId}`);

//   User.findById(userId)
//     .populate({
//       path: "maps",
//       model: "Map",
//     })
//     .exec((err, user) => {
//       if (err) {
//         return res.status(500).json({ errorMessage: err.message });
//       } else if (!user) {
//         return res.status(404).json({ errorMessage: "User not found." });
//       }

//       return res.status(200).json(user.maps);
//     });
// };

getMapsByMapIds = async (req, res) => {
  console.log('getMapsByMapIds');
  
  let idList = req.params.idLists;
  idList = idList.split(",");
  if (!idList) {
    return [];
  }

  Map.find({ _id: { $in: idList } }, (err, maps) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!maps) {
      return res.status(404).json({ errorMessage: "Maps not found." });
    }

    return res.status(200).json(maps);
  });
};

// helper function to update map publish status
updateMapPublishStatusById = async (req, res, newPublishStatus) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  // check user & map existence
  const userId = req.userId;
  const mapId = req.params.id;

  if (!userId) {
    return res.status(400).json({ errorMessage: "User does not exist." });
  }
  if (!mapId) {
    return res.status(400).json({ errorMessage: "Map ID does not exist." });
  }

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User cannot be found." });
    }

    Map.findById(mapId, (err, map) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      } else if (!map) {
        return res.status(404).json({ errorMessage: "Map is not found." });
      } else if (map.isPublished === newPublishStatus) {
        if (map.isPublished) {
          return res.status(404).json({
            errorMessage:
              "User cannot publish a map that has already been published.",
          });
        } else {
          return res.status(404).json({
            errorMessage: "User cannot unpublish a map that is not published.",
          });
        }
      }

      const currTime = new Date();
      map.isPublished = newPublishStatus;
      if (newPublishStatus) {
        const oldMap = req.body;
        map.mapType = oldMap.mapType;
        map.mapTypeData = oldMap.mapTypeData;
        map.datePublished = currTime;
      } else {
        map.datePublished = null;
        map.dateEdited = currTime;
      }

      map
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            map: map,
            message: "Map's publish status has been updated!",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            errorMessage: "Failed to publish user's map, please try again.",
          });
        });
    }).catch((error) => {
      return res.status(400).json({
        error,
        errorMessage: "Failed to publish user's map, please try again.",
      });
    });
  });
};

// publish/unpublish map
publishMapById = async (req, res) => {
  await updateMapPublishStatusById(req, res, true);
};

unpublishMapById = async (req, res) => {
  await updateMapPublishStatusById(req, res, false);
};

getAllPublishedMapsFromGivenUser = async (req, res) => {
  const userId = req.params.userId;

  // check user existence
  if (!userId) {
    return res.status(400).json({ errorMessage: "User id does not exist." });
  }

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User is not found." });
    }

    const mapIDs = user.maps;

    if (!mapIDs) {
      return res
        .status(404)
        .json({ errorMessage: "Map Collection is not found." });
    }

    // console.log(`Get maps from user ${userId}`);
    // console.log(`user has ${mapIDs.length} maps`)

    Map.find({ _id: { $in: mapIDs } }, (err, maps) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      } else if (!maps) {
        return res.status(404).json({ errorMessage: "Maps are not found." });
      }

      return res.status(200).json({
        success: true,
        maps: maps.filter((map) => map.isPublished),
      });
    });
  }).catch((error) => {
    return res.status(400).json({
      error,
      errorMessage:
        "Failed to get all published maps from user, please try again.",
    });
  });
};

updateMapById = async (req, res) => {
  const userId = req.userId;
  const mapId = req.params.id;

  if (!userId) {
    return res.status(400).json({ errorMessage: "User does not exist." });
  }
  if (!mapId) {
    return res.status(400).json({ errorMessage: "Map ID does not exist." });
  }

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User cannot be found." });
    }

    Map.findById(mapId, (err, map) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      } else if (!map) {
        return res.status(404).json({ errorMessage: "Map is not found." });
      }

      const { title, mapContent, tags, mapType, mapTypeData } = req.body;
      map.title = title;
      map.mapContent = mapContent;
      map.tags = tags;
      map.mapType = mapType;
      map.mapTypeData = mapTypeData;
      map.dateEdited = new Date();

      map
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            map: map,
            message: "Map has been updated!",
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({
            error,
            errorMessage: "Failed to update user's map, please try again.",
          });
        });
    }).catch((error) => {
      console.log(error);
      return res.status(400).json({
        error,
        errorMessage: "Failed to update user's map, please try again.",
      });
    });
  });
};

createMapComment = async (req, res) => {
  try {
    if (auth.verifyUser(req) === null) {
      return res.status(401).json({
        errorMessage: "Unauthorized",
      });
    }

    const userId = req.userId;
    const mapId = req.params.mapId;
    const { commenterUserName, content } = req.body;

    if (!userId) {
      return res.status(400).json({ errorMessage: "User does not exist." });
    }
    if (!commenterUserName || !content) {
      return res.status(400).json({
        errorMessage: "Please enter both commenterUserName and content.",
      });
    }

    const map = await Map.findById(mapId);
    if (!map || !map.isPublished) {
      return res
        .status(404)
        .json({ errorMessage: "Map not found or not published." });
    }

    const newComment = new Comment({
      commenterUserName: commenterUserName,
      type: "map",
      content: content,
    });

    await newComment.save();
    map.comments.push(newComment._id);
    await map.save();

    return res.status(201).json({
      success: true,
      comment: newComment,
      message: "Comment added successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
};

getAllCommentsFromPublishedMap = async (req, res) => {
  const mapId = req.params.mapId;
  // console.log(mapId);

  try {
    const map = await Map.findById(mapId);

    if (!map) {
      return res.status(404).json({ errorMessage: "Map not found." });
    }
    if (!map.isPublished) {
      return res.status(400).json({ errorMessage: "Map is not published." });
    }

    const comments = await Comment.find({ _id: { $in: map.comments } }).populate('subComments');

    return res.status(200).json({ comments });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
};

deleteMapCommentById = async (req, res) => {
  try {
    if (auth.verifyUser(req) === null) {
      return res.status(401).json({
        errorMessage: "Unauthorized",
      });
    }

    const commentId = req.params.commentId;
    console.log("Map commentId for deletion: ", commentId);

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ errorMessage: "Comment not found" });
    }

    const updatedMap = await Map.findOneAndUpdate(
      { comments: commentId },
      { $pull: { comments: commentId } },
      { new: true }
    );

    if (!updatedMap) {
      return res
        .status(404)
        .json({ errorMessage: "Map not found for the given comment" });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      deletedComment: deletedComment,
      updatedMap: updatedMap,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

likeDislikeMapById = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  const userId = req.userId;
  const mapId = req.params.id;
  const { isLike } = req.body;

  if (!userId) {
    return res.status(400).json({ errorMessage: "User does not exist." });
  }
  if (!mapId) {
    return res.status(400).json({ errorMessage: "Map ID does not exist." });
  }

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User cannot be found." });
    }

    Map.findById(mapId, (err, map) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }
      else if(!map) {
        return res.status(404).json({ errorMessage: "Map cannot be found." });
      }

      const userLikedMap = map.likedUsers.find(
        (user) => String(user) === String(userId)
      );
      const userDislikedMap = map.dislikedUsers.find(
        (user) => String(user) === String(userId)
      );

      if (isLike) {
        if (userLikedMap) {
          return res
            .status(400)
            .json({ errorMessage: "User already liked map" });
        }
        if (userDislikedMap) {
          map.dislikedUsers = map.dislikedUsers.filter(
            (user) => String(user) !== String(userId)
          );
        }
        map.likedUsers.push(userId);
      } else {
        if (userDislikedMap) {
          return res
            .status(400)
            .json({ errorMessage: "User already disliked map" });
        }
        if (userLikedMap) {
          map.likedUsers = map.likedUsers.filter(
            (user) => String(user) !== String(userId)
          );
        }
        map.dislikedUsers.push(userId);
      }

      map
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            map: map,
            message: "Map's like/dislike status has been updated!",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            errorMessage:
              "Failed to update like/dislike of the map, please try again.",
          });
        });
    }).catch((error) => {
      return res.status(400).json({
        error,
        errorMessage:
          "Failed to update like/dislike of the map, please try again.",
      });
    });
  });
};

duplicateMap = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  const userId = req.userId;
  const mapId = req.params.mapId;
  const { title } = req.body;

  if (!userId || !mapId) {
    return res.status(400).json({ errorMessage: "Invalid request parameters." });
  }
  if(!title){
    return res.status(400).json({ errorMessage: "User hould provide map title." });
  }

  try {
    const user = await User.findById(userId);
    console.log("self: ",user);
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found." });
    }

    const mapToDuplicate = await Map.findById(mapId);
    console.log("target map to duplicate: ", mapToDuplicate);
    if (!mapToDuplicate) {
      return res.status(404).json({ errorMessage: "Map not found." });
    }

    const duplicatedMap = new Map({
      ownerUserName: user.userName,
      title: title,
      fileFormat: mapToDuplicate.fileFormat,
      mapType: mapToDuplicate.mapType,
      mapContent: mapToDuplicate.mapContent,
      mapTypeData : mapToDuplicate.mapTypeData,
      tags: mapToDuplicate.tags,
      isPublished: false,
    });

    user.maps.push(duplicatedMap);
    await user.save();

    await duplicatedMap.save();

    return res.status(201).json({
      success: true,
      map: duplicatedMap,
      message: "Map duplicated successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      errorMessage: "Failed to duplicate map, please try again.",
    });
  }
};

createSubcomment = async (req, res) => {
  console.log("Entered create subcomment server")
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

deleteSubCommentById = async (req, res) => {
  const subcommentId = req.params.commentId;
  if(!subcommentId){
    return res.status(400).json({ errorMessage: "No comment ID found." });
  }

  Subcomment.findById(subcommentId, (err, subcomment) =>{
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    console.log('subcomment');
    console.log(subcomment);

    async function findComment(){
      try{
        const comment = await Comment.findOne({subComments: { $in: subcommentId }});
        if (!comment){
          return res.status(404).json({ errorMessage: 'Comment not found.' });
        }

        comment.subComments.pull(subcomment);
        await comment.save();
        await subcomment.remove();

        return res.status(200).json({
          message: 'subcomment deleted successfully!',
          comment: subcomment,
        });
      } catch(err) {
        console.log(err);
        if(err.errorMessage){
          return res.status(500).json({errorMessage: err.errorMessage});
        }
        return res.status(500).json({errorMessage: err.message});
      }
    }

    findComment();
  })
};

module.exports = {
  createMap,
  getMapById,
  deleteMapById,
  // getAllMapsFromCurrentUser,
  getMapsByMapIds,
  publishMapById,
  unpublishMapById,
  getAllPublishedMapsFromGivenUser,
  updateMapById,
  createMapComment,
  getAllCommentsFromPublishedMap,
  deleteMapCommentById,
  likeDislikeMapById,
  duplicateMap,
  createSubcomment,
  deleteSubCommentById
};
