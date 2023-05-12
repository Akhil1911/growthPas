import express from "express";
import { confirmStudentController, deleteQuestionHandler, getFilteredStudentsController, getStudentController, getTuitionDetailController, removeStudentController, submitAnswerController, updateTuitionProfileController } from "../controllers/authControllers.js";
import {isTutionSubscribed, requireSignIn} from "../middlewares/authMiddleware.js"


const router = express.Router();

//get all students
router.get("/students-list/:token", getStudentController)

//update || confirm student
router.put(
  "/confirm-students/:id",
  confirmStudentController
);

//delete || delete-student
router.delete(
  "/remove-student/:id",
  removeStudentController
);

//update || tuition profile
router.put("/update-profile", updateTuitionProfileController)

//get tuition details
router.get("/get-tuition-detail/:token", getTuitionDetailController)


//get || filter students
router.post("/get-filtered-students/:token", getFilteredStudentsController);

//submit answer
router.put("/tuition-submit-answer/:id", submitAnswerController);

//delete question
router.delete("/tuition-delete-question/:id",deleteQuestionHandler)
export default router;
