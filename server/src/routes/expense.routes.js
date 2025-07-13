import { Router } from "express";
import { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel } from "../controllers/expense.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/add").post(verifyJWT, addExpense);
router.route("/get").get(verifyJWT, getAllExpense);
router.route("/downloadexcel").get(verifyJWT, downloadExpenseExcel);
router.route("/:_id").delete(verifyJWT, deleteExpense);


export default router;