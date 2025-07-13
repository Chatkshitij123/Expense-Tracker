import { Router } from "express";
import { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } from "../controllers/income.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/add").post(verifyJWT, addIncome);
router.route("/get").get(verifyJWT, getAllIncome);
router.route("/downloadexcel").get(verifyJWT, downloadIncomeExcel);
router.route("/:_id").delete(verifyJWT, deleteIncome);


export default router;