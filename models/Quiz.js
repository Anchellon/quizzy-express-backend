const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
let Question = require("./Question");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    name: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});
QuizSchema.plugin(timestampPlugin);
QuizSchema.pre("deleteOne", { document: true }, async function (next) {
    // Deletes all the questions associated with it first before proceeding to delete the quiz

    await Question.deleteMany({ quiz: this._id });

    next();
});
module.exports = mongoose.model("Quiz", QuizSchema);
