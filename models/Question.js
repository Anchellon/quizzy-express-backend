const mongoose = require("mongoose");
let timestampPlugin = require("./plugins/timestamp");
// Define a schema
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    qnText: { type: String, required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    options: [
        {
            type: String,
            required: true,
            // validate: [
            //     function (value) {
            //         return len(value) > 0;
            //     },
            // ],
        },
    ],
    correctAnswer: {
        type: Number,
        required: true,
        validate: [
            function (value) {
                return value <= this.options.length;
            },
        ],
    },
});
QuestionSchema.plugin(timestampPlugin);
module.exports = mongoose.model("Question", QuestionSchema);
