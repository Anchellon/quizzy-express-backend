const Question = require("../models/Question");

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

*/
exports.question_create_postMethod = (req, res) => {};

exports.question_info_patchMethod = (req, res) => {
  res.send("NOT IMPLEMENTED:question_info_patchMethod");
};
