const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema(
  {
    ownerUserName: { type: String, required: true },
    title: { type: String, required: true },
    tags: [{ type: String, required: true }],
    content: { type: String, required: true },
    likedUsers: [{ type: ObjectId, ref: "User" }],
    dislikedUsers: [{ type: ObjectId, ref: "User" }],
    comments: [{ type: ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Post", PostSchema);
