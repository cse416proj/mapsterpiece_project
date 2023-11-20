// const Map = require("../models/map-model");
// const Post = require("../models/post-model");
const User = require("../models/user-model");
// const auth = require("../auth");

// guest can load given user's maps, so no auth
getAllPublishedMaps = async (req, res) => {
    const { userName } = req.body;

    // check user existence
    if (!userName) {
        return res.status(400).json({ errorMessage: "Username does not exist." });
    }

    User.findOne({userName: userName}, (err, user) => {
        if(err){
            return res.status(500).json({ errorMessage: err.message });
        }
        else if(!user){
            return res.status(404).json({ errorMessage: "User is not found." });
        }

        console.log(`Get maps from user ${userName}`);

        const publishedMaps = user.maps.filter((map) => map.isPublished);

        return res.status(200).json({
            success: true,
            maps: publishedMaps
        });
    })
    .catch((error) => {
        return res.status(400).json({
            error,
            errorMessage: "Failed to get user's maps, please try again."
        });
    });
}

module.exports = {
    getAllPublishedMaps
};