// create subcomment schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubcommentSchema = new Schema(
  {
    commenterUserName: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Subcomment", SubcommentSchema);
