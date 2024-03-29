const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const { body, validationResult } = require("express-validator");

/** get a list of all quizes by a particular user  */
exports.index = (req, res, next) => {
    // get a list of all quizes by a particular user
    resObj = {};
    Quiz.find({})
        .then((quizArray) => {
            if (quizArray) {
                resObj.quizzes = quizArray;
            }
            resObj.message = "Quiz List for the user";
            res.status(200).send(resObj);
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log(err);
            res.send(400, "Bad Request");
        });
};
/**
 * Creating an empty quiz
 * Testing Complete
 * Working
 */

exports.quiz_create_postMethod = [
    body("quizName", "Quiz name required").trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const quiz = new Quiz({ name: req.body.quizName });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages
            res.status(422).send({
                message: "Invalid Input",
                errors: errors.array(),
            });
            return;
        }
        Quiz.findOne({ name: req.body.quizName })
            .then((found_quiz) => {
                // console.log(found_quiz);
                if (found_quiz) {
                    // Quiz exists, redirect to its detail page.
                    console.log("Im found");
                    res.status(403).send({
                        message: "Quiz with the same Name Exists",
                        qid: found_quiz.id,
                    });
                } else {
                    quiz.save().then((savedDoc) => {
                        resObj = {};

                        // Quiz saved. Redirect to genre detail page.
                        resObj.msg = "Saved Successfully";
                        resObj.name = savedDoc.name;
                        resObj.id = savedDoc._id;
                        res.status(200).send(resObj);
                    });
                }
            })
            .catch((error) => {
                //When there are errors We handle them here
                console.log(err);
                res.send(400, "Bad Request");
            });
    },
];

/**
 * Deleting a quiz
 * Testing Underway
 */
exports.quiz_deleteMethod = (req, res, next) => {
    console.log(req.params);
    console.log("hi");
    Quiz.findOne({ _id: req.params.id })
        .then(async (val) => {
            let id = await val.deleteOne();
            // console.log(id);
            res.status(204).send({
                msg: "Successfully deleted",
            });
        })
        .catch((err) => {
            console.log(`caught the error: ${err}`);
            return res.status(500).json(err);
        });
};
/**
 * Testing required
 */
exports.quiz_updateName_putMethod = [
    // Validate and sanitze the name field.
    body("name", "Genre name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
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
            await Quiz.findByIdAndUpdate(
                req.params.id,
                quiz,
                {},
                function (err, thequiz) {
                    if (err) {
                        return next(err);
                    }
                    // Successful - redirect to genre detail page.
                    res.status(204).send({
                        msg: "Successfully Updated Quiz Name",
                    });
                }
            );
        }
    },
];

exports.quiz_Info_getMethod = (req, res) => {
    let resObj = {};
    Quiz.findById(req.params.id)
        .then((quiz) => {
            // For the quiz find all relevant details including all questions and their corresponding
            resObj.quiz = quiz;
            Question.find({ quiz: req.params.id })
                .then((qns) => {
                    resObj.questions = qns;
                    res.status(200).send(resObj);
                })
                .catch((error) => {
                    //When there are errors We handle them here
                    console.log(err);
                    res.send(400, "Bad Request");
                });
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log(error);
            res.send(400, "Bad Request");
        });
};
