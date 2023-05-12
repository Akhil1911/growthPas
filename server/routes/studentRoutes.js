import express from "express";
import { deleteStudentAccountController, getAllQuestionController, getStudentDetailsController, getTuitionDetailsController, questionSubmitController, updateStudentProfileController } from "../controllers/studentController.js";

const router = express.Router();
//get solo student details
router.get("/student-details/:token", getStudentDetailsController);
//get tuitionDetails
router.get("/get-tuition-details/:id", getTuitionDetailsController)
//put || update studnet
router.put("/update-student-profile", updateStudentProfileController);
//delete || delete student account
router.delete("/delete-student-account/:email",deleteStudentAccountController)
//post || add tuition
router.post("/submit-question",questionSubmitController)
//get || student question answer
router.get("/student-view-question/:token",getAllQuestionController)
export default router;
