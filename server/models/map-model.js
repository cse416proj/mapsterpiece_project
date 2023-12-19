const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MapSchema = new Schema(
  {
    ownerUserName: { type: String, required: true },
    title: { type: String, required: true },
    fileFormat: { type: String, required: true },
    mapType: { type: String, required: true },
    mapContent: [{ type: Object, required: true }],
    mapTypeData: {
      legendTitle: { type: String, required: true },
      dataColor: { type: String },
      max: { type: Number, required: true },
      data: [
        {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true },
          value: { type: Number, required: true },
          regionName: { type: String, required: true },
          radius: { type: Number },
          randomDotsForRegion: [{ type: Object }],
          properties: [
            {
              property: { type: String, required: true },
              value: { type: Schema.Types.Mixed, required: true },
            }
          ]
        },
      ],
    },
    tags: [{ type: String, required: true }],
    isPublished: { type: Boolean, default: false, required: true },
    comments: [{ type: ObjectId, ref: "Comment" }],
    likedUsers: [{ type: ObjectId, ref: "User" }],
    dislikedUsers: [{ type: ObjectId, ref: "User" }],
    dateEdited: { type: Date, default: Date.now },
    datePublished: { type: Date },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Map", MapSchema);
