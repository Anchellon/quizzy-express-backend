const express = require("express");
const router = express.Router();

// Require controller modules.
const quiz_controller = require("../controllers/quizController");
const question_controller = require("../controllers/questionController");
// GET catalog home page. to display all quizes
router.get("/", quiz_controller.index);

// POST to Create an empty quiz with quiz name
router.post("/quiz/create", quiz_controller.quiz_create_postMethod);

// DELETE Quiz with a specific ID
router.delete("/quiz/delete/:id", quiz_controller.quiz_deleteMethod);

// PUT / UPDATE the quiz object, specifically name
router.put("/quiz/edit/:id", quiz_controller.quiz_updateName_putMethod);

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
router.post("question/:id", question_controller.question_info_postMethod);

// POST Question details along with all options associcated with it
router.patch("question/:id", question_controller.question_info_patchMethod);
