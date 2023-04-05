const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  optionText: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
});
OptionSchema.plugin(timestampPlugin);
module.exports = mongoose.model("Option", OptionSchema);
