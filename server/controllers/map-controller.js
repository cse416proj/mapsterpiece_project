const Map = require("../models/map-model");
const User = require("../models/user-model");
const auth = require("../auth");

createMap = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  const userId = req.userId;
  const { ownerUserName, title, fileFormat, mapContent, tags } = req.body;

  // check user existence & payload
  if (!userId) {
    return res.status(400).json({ errorMessage: "User does not exist." });
  }

  if (!ownerUserName || !title || !fileFormat || !mapContent || !tags) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
  }

  const allowProperties = [
    "NAME_0",
    "NAME_1",
    "NAME_2",
    "NAME_3",
    "name_0",
    "name_1",
    "name_2",
    "name_3",
    "ID_0",
    "ID_1",
    "ID_2",
    "ID_3",
    "name",
  ];

  const features = mapContent.features;
  let nameListUpper = ["NAME_0", "NAME_1", "NAME_2", "NAME_3"];
  let featuresFiltered = [];

  for (let i = 0; i < features.length; i++) {
    if (features[i].properties) {
      Object.keys(features[i].properties).forEach((property) => {
        if (!allowProperties.includes(property))
          delete features[i].properties[property];
        else {
          if (nameListUpper.includes(property)) {
            features[i].properties[property.toLowerCase()] =
              features[i].properties[property];
            delete features[i].properties[property];
          }
        }
      });
    }
    featuresFiltered[i] = features[i];
  }

  // create map
  const newMap = new Map({
    ownerUserName,
    title,
    fileFormat,
    mapContent: featuresFiltered,
    tags,
    isPublished: false,
  });
  if (!newMap) {
    return res.status(400).json({
      success: false,
      errorMessage: "Create Map failed, please try again.",
    });
  }

  // find user by id & add new map to their map collection
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!user) {
      return res.status(404).json({ errorMessage: "User cannot be found." });
    } else if (user.userName !== ownerUserName) {
      return res.status(500).json({ errorMessage: "Username does not match" });
    }

    user.maps.push(newMap);

    user
      .save()
      .then(() => {
        newMap
          .save()
          .then(() => {
            return res.status(201).json({
              success: true,
              map: newMap,
              message: "A new map has been created successfully!",
            });
          })
          .catch((error) => {
            return res.status(400).json({
              error,
              errorMessage: "Failed to create map, please try again.",
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

getMapById = async (req, res) => {
  const mapId = req.params.id;

  if (!mapId) {
    return res.status(400).json({ errorMessage: "Map ID does not exist." });
  }

  Map.findById(mapId, (err, map) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    } else if (!map) {
      return res.status(404).json({ errorMessage: "Map is not found." });
    }
    return res.status(200).json({
      success: true,
      map: map,
    });
  }).catch((error) => {
    return res.status(400).json({
      error,
      errorMessage: "Failed to get user's map, please try again.",
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
          console.log(mapToDelete);

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

getAllMapsFromCurrentUser = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }

  // check user existence
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ errorMessage: "User does not exist." });
  }

  console.log(`Now getting maps from user ${userId}`);

  User.findById(userId)
    .populate({
      path: "maps",
      model: "Map",
    })
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      } else if (!user) {
        return res.status(404).json({ errorMessage: "User not found." });
      }

      return res.status(200).json(user.maps);
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

      map.isPublished = newPublishStatus;
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

      const { title, mapContent, tags } = req.body;

      map.title = title;
      map.mapContent = mapContent;
      map.tags = tags;

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
          return res.status(400).json({
            error,
            errorMessage: "Failed to update user's map, please try again.",
          });
        });
    }).catch((error) => {
      return res.status(400).json({
        error,
        errorMessage: "Failed to update user's map, please try again.",
      });
    });
  });
};

module.exports = {
  createMap,
  getMapById,
  deleteMapById,
  getAllMapsFromCurrentUser,
  publishMapById,
  unpublishMapById,
  getAllPublishedMapsFromGivenUser,
  updateMapById,
};
