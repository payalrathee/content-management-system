import { Router } from "express";
import { loginValidator, passwordValidator, userValidator } from "../validators/index.js";
import validationHandler from "../middlewares/validation-handler.js";
import { loginUser, registerUser } from "../controllers/auth.js";
import { uploadPublic } from "../middlewares/upload.js";

const router = Router();

router.post(
    "/register",
    uploadPublic.single("profileImg"),
    userValidator,
    passwordValidator,
    validationHandler,
    registerUser,
);

router.post(
    "/login",
    loginValidator,
    validationHandler,
    loginUser
)

export default router;
