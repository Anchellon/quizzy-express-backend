const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  name: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});
QuizSchema.plugin(timestampPlugin);
module.exports = mongoose.model("Quiz", QuizSchema);
