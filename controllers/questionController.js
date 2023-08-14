// import { Schema } from "express-validator/src/middlewares/schema";
// import mongoose, { ClientSession } from "mongoose";
const mongoose = require("mongoose");
const Question = require("../models/Question");
const Option = require("../models/Option");

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
exports.question_create_postMethod = (req, res) => {
  let idOptions = [];
  createQuestion();
  res.status(200).send();
  // let idOptions: Array<string> = [];
  // 1. for each option go and create an option in the otptions table
  // and collect theeier ids in the idOptions array
  // 2. Create the question once this step is done ,
  // add the ids collected as a field in the question
  //  Trying to omplement this using transactions in mongoose
  // https://stackoverflow.com/questions/51228059/mongo-db-4-0-transactions-with-mongoose-nodejs-express
};

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

// async function createQuestion(quizID, questionText, options, correctAnswer) {
async function createQuestion() {
  // const session: ClientSession = await mongoose.startSession();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // TODO Add your statement here
    // We can write the options concurrently because we are not modifying the same record

    Option.insertMany([
      { optionText: "option 4" },
      { optionText: "option 5" },
      { optionText: "option 6" },
    ])
      .then(function (options) {
        Question.create({
          quiz: new mongoose.mongo.ObjectId("6438964b45f3c98ec5f72beb"),
          correctAnswer: new mongoose.mongo.ObjectId(
            "64389bee45f3c98ec5f72bfc"
          ),
          qnText: "Will this work?",
        });
      })
      .catch(function (error) {
        console.log(error); // Failure
      });

    // Commit the changes
    await session.commitTransaction();
  } catch (error) {
    // Rollback any changes made in the database
    await session.abortTransaction();

    // Rethrow the error
    throw error;
  } finally {
    // Ending the session
    session.endSession();
  }
}
