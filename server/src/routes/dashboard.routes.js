import { Router } from "express";
import { getDashboardData } from "../controllers/dashboard.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/").get(verifyJWT, getDashboardData);



export default router;