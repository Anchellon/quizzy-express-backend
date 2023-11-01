const express = require("express");
const router = express.Router();

/**  Require controller modules. */
const quiz_controller = require("../controllers/quizController");
const question_controller = require("../controllers/questionController");

/* GET catalog home page. to display all quizes */
router.get("/", quiz_controller.index);
// router.post("/test", question_controller.quesstion_testMethod);

// POST to Create an empty quiz with quiz name
router.post("/quiz/", quiz_controller.quiz_create_postMethod);

// DELETE Quiz with a specific ID
router.delete("/quiz/:id", quiz_controller.quiz_deleteMethod);

// PUT / UPDATE the quiz object, specifically name
router.put("/quiz/:id", quiz_controller.quiz_updateName_putMethod);

// GET all the details of a partciular quiz
router.get("/quiz/:id", quiz_controller.quiz_Info_getMethod);

// DELETE Question with a specific ID
router.delete(
    "/question/delete/:id",
    question_controller.question_deleteMethod
);

// GET Question details along with all options associcated with it
router.get("question/:id", question_controller.question_info_getMethod);

// POST Question details along with all options associcated with it
router.post(
    "/quiz/:id/question",
    question_controller.question_create_postMethod
);

// POST Question details along with all options associcated with it
router.patch("question/:id", question_controller.question_info_patchMethod);

module.exports = router;
