// import { Schema } from "express-validator/src/middlewares/schema";
// import mongoose, { ClientSession } from "mongoose";
const conn = require("../utils/connection");
const Question = require("../models/Question");
const Option = require("../models/Option");
const Quiz = require("../models/Quiz");
const { body, validationResult } = require("express-validator");
exports.question_deleteMethod = (req, res) => {
    res.send("NOT IMPLEMENTED: question delete method");
};

exports.question_info_getMethod = (req, res) => {
    res.send("NOT IMPLEMENTED: question info GET method");
};
//  santize and validate needed
/*
request format
{
  quizID: int
  questionText: string
  options: []
  correctAnswer: int // coming from index of options
}
Lets try making the schema with express validators
https://github.com/validatorjs/validator.js#sanitizers  
https://blog.tericcabrel.com/how-to-use-mongodb-transaction-in-node-js/

Adding types to validator schema
https://github.com/express-validator/express-validator/issues/607
Findings: ValidationSchema Deprecated use Schema

InsertMany in mongodb uses async under the hood 
https://github.com/Automattic/mongoose/blob/65e744b9fa7066495ab965b7be3c53c51ca2b00b/lib/model.js#L1824
so it is parallelized

mongoose uses insertmany under the hood so it is also parallelized

*/

// let mySchema: Schema = {
let myschema = {
    quizID: {
        // The location of the field, can be one or more of body, cookies, headers, params or query.
        // If omitted, all request locations will be checked
        in: ["params", "query"],
        errorMessage: "ID is wrong",
        isInt: true,
        // Sanitizers can go here as well
        toInt: true,
    },
};
// Implemented It works
exports.question_create_postMethod = [
    body("id", "Quiz ID is required").trim().isLength({ min: 1 }).escape(),
    async (req, res, next) => {
        console.log(req.body.options);
        let options = req.body.options;
        let correctAnswer = req.body.isCorrect;
        try {
            const session = await conn.startSession();
            await session.withTransaction(async () => {
                console.log("hi");
                console.log(options);
                let op = await Option.insertMany(options);
                //  Order of insert is maintained
                // retrieve the correct options id number
                let idCorrectAnswer = op[correctAnswer]._id;
                console.log(req.body.questionText);
                let qn = await Question.create({
                    qnText: req.body.questionText,
                    quiz: req.body.id,
                    correctAnswer: idCorrectAnswer,
                });
                console.log(req.body.id);
                let quiz = await Quiz.findByIdAndUpdate(req.body.id, {
                    $push: { questions: qn._id },
                });
                console.log(quiz);
            });
            session.endSession();
            console.log("Succes!");
            res.status(200).send();
        } catch (error) {
            console.log(error);
        }
    },
];

exports.question_info_patchMethod = (req, res) => {
    res.send("NOT IMPLEMENTED:question_info_patchMethod");
};

/*
request format
{
  quizID: int
  questionText: string
  options: []
  correctAnswer: int // coming from index of options
}
*/
