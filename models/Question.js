const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  qnText: { type: String, required: true },
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  corectAnswer: { type: Schema.Types.ObjectId, ref: "Option", required: true },
});
QuestionsSchema.plugin(timestampPlugin);
module.exports = mongoose.model("Question", QuestionSchema);