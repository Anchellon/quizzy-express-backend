const Quiz = require("../models/Quiz");
const Quiz = require("../models/Question");
const { body, validationResult } = require("express-validator");
const Option = require("../models/Option");
const Question = require("../models/Question");

exports.index = (req, res) => {
  // get a list of all quizes by a particular user
  resObj = {};

  Quiz.find({}).exec((err, quizArray) => {
    if (err) {
      return next(err);
    }
    resObj.quizzes = quizArray;
    resObj.message = "Quiz List for the user";
    res.status(200).send(resObj);
  });
};
// Done testing required
exports.quiz_create_postMethod = [
  body("name", "Quiz   name required").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const quiz = new Quiz({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages
      res.status(422).send({
        message: "Invalid Input",
        errors: errors.array(),
      });
      return;
    }
    Quiz.findOne({ name: req.body.name }).exec((err, found_quiz) => {
      if (err) {
        return next(err);
      }

      if (found_quiz) {
        // Quiz exists, redirect to its detail page.
        res.status(403).send({
          message: "Quiz with the same Name Exists",
          qid: found_quiz.id,
        });
      } else {
        quiz.save((err) => {
          if (err) {
            return next(err);
          }
          // Quiz saved. Redirect to genre detail page.
          res.status(200).send({ msg: "Saved Successfully", name: quiz.name });
        });
      }
    });
  },
];
//  Done and Testing required
exports.quiz_deleteMethod = (req, res, next) => {
  async.parallel(
    {
      quizDelete: () => {
        // get Quiz To be deleted
        Quiz.findByIdAndDelete(req.params.id).exec();
      },
      deleteMeta: () => {
        Question.find({ quiz: req.params.id }).exec((err, qns) => {
          if (err) {
            return next(err);
          }
          qns.forEach((qn) => {
            Option.find({ question: qn.id }).exec((options) => {
              options.forEach((op) => {
                Option.findByIdAndDelete(op.id);
              });
            });
          });
        });
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.quiz == null) {
        // No results.
        res.redirect("/catalog/quiz");
      }
      // Successful Delete
      res.status(200).send({
        msg: "Successfully deleted",
      });
    }
  );
};
//  Done Testing Required
exports.quiz_updateName_putMethod = [
  // Validate and sanitze the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request .
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data (and the old id!)
    var genre = new Quiz({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      res.status(422).send({
        message: "Invalid Input",
        errors: errors.array(),
      });
      return;
    } else {
      // Update the record.
      Quiz.findByIdAndUpdate(req.params.id, quiz, {}, function (err, thequiz) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to genre detail page.
        res.status(204).send({
          msg: "Successfully Updated Quiz Name",
        });
      });
    }
  },
];

exports.quiz_Info_getMethod = (req, res) => {
  let resObj = {};
  Quiz.findById(req.params.id).exec((err, quiz) => {
    if (err) {
      return next(err);
    }
    // For the quiz find all relevant details including all questions and their corresponding
    resObj.quiz = quiz;
    Question.find({ quiz: req.params.id }).exec((err, qns) => {
      if (err) {
        return next(err);
      }
      qns = [];
      qns.forEach((qn) => {
        qnObj = {};
        qnObj.qn = qn;
        qnObj.options = [];
        Option.find({ question: qn.id }).exec((options) => {
          qnObj.options.apply(options);
        });
        qns.push(qnObj);
      });
      resObj.message = "Quiz Info Retrieved";
      res.status(200).send(resObj);
    });
  });
};
