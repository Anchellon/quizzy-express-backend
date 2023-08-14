const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  qnText: { type: String, required: true },
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  correctAnswer: { type: Schema.Types.ObjectId, ref: "Option", required: true },
});
QuestionSchema.plugin(timestampPlugin);
module.exports = mongoose.model("Question", QuestionSchema);
