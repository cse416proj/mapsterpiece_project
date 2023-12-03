const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MapSchema = new Schema(
  {
    ownerUserName: { type: String, required: true },
    title: { type: String, required: true },
    fileFormat: { type: String, required: true },
    mapContent: [{ type: Object, required: true }],
    tags: [{ type: String, required: true }],
    isPublished: { type: Boolean, default: false, required: true },
    comments: [{ type: ObjectId, ref: "Comment" }],
    likedUsers: [{ type: ObjectId, ref: "User" }],
    dislikedUsers: [{ type: ObjectId, ref: "User" }],
    dateCreated: { type: Date, default: Date.now },
    dateEdited: { type: Date },
    datePublished: { type: Date }
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Map", MapSchema);