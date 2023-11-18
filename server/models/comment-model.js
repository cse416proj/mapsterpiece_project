// create comment schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema(
  {
    commenterUserName: { type: String, required: true },
    content: { type: String, required: true },
    subComments: [{ type: ObjectId, ref: "Subcomment" }],
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Comment", CommentSchema);
