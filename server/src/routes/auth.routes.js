import { Router } from "express";
import { loginUser, logoutUser, registerUser, getUserInfo} from "../controllers/auth.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    // upload.single("avatar"),
    registerUser)

router.route("/login").post(loginUser)



//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/getUser").get(verifyJWT, getUserInfo)

export default router;

