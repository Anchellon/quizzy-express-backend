const Quiz = require("../models/Quiz");
const Quiz = require("../models/Question");
const { body, validationResult } = require("express-validator");
const Option = require("../models/Option");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: index method");
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
          // Genre saved. Redirect to genre detail page.
          res.status(200).send({ msg: "Saved Successfully", name: quiz.name });
        });
      }
    });
  },
];

exports.quiz_deleteMethod = (req, res, next) => {
  async.parallel(
    {
      quizDelete: () => {
        // get Quiz To be deleted
        Quiz.findByIdAndDelete(req.params.id).exec();
      },
      deleteMeta: () => {
        Question.find({ quiz: req.params.id }).exec((qns) => {
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

exports.quiz_updateName_putMethod = (req, res) => {
  res.send("NOT IMPLEMENTED: quiz_updateName_putMethod");
};
exports.quiz_Info_getMethod = (req, res) => {
  res.send("NOT IMPLEMENTED: quiz_Info_getMethod");
};
