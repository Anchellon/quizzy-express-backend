const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
const Schema = mongoose.Schema;

const TestDetailSchema = new Schema({
  //   userID: { type: Schema.Types.ObjectId, required: true },
  quizID: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  questionID: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  optionMarked: { type: Schema.Types.ObjectId, ref: "Option", required: true },
  attempt: { type: Number, required: true },
});
TestDetailSchema.plugin(timestampPlugin);
module.exports = mongoose.model("Quiz", QuizSchema);
// Calculate the attempt and save it
