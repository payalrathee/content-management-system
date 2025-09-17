import { body, param } from "express-validator";

const idValidator = [
    param("id")
        .trim()
        .notEmpty()
        .withMessage("ID is missing")
        .isMongoId()
        .withMessage("Please provide a valid ID")
        .escape(),
];

const emailValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide an email")
        .isEmail()
        .withMessage("Please provide a valid email")
        .escape(),
];

const passwordValidator = [
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password can't be empty")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must include at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must include at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must include at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must include at least one special character")
        .escape(),
];

const loginValidator = [
    body("username")
        .trim()
        .optional()
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "Username must contain atleast 3 characters and must not exceed 20 characters",
        )
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores",
        )
        .escape(),
    body("email")
        .trim()
        .optional()
        .isEmail()
        .withMessage("Please provide a valid email")
        .escape(),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password can't be empty")
        .escape(),
];

const userValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username can't be empty")
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "Username must contain atleast 3 characters and must not exceed 20 characters",
        )
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores",
        )
        .escape(),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide an email")
        .isEmail()
        .withMessage("Please provide a valid email")
        .escape(),
    body("firstName")
        .trim()
        .optional()
        .isLength({ max: 50 })
        .withMessage("First name can't exceed 50 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("First name can only contain letters")
        .escape(),
    body("lastName")
        .trim()
        .optional()
        .isLength({ max: 50 })
        .withMessage("Last name can't exceed 50 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Last name can only contain letters")
        .escape(),
    body("phone")
        .trim()
        .optional()
        .isLength({ max: 50 })
        .withMessage("Last name can't exceed 50 characters")
        .matches(/^[0-9]{10}$/)
        .withMessage("Please provide a valid phone number")
        .escape(),
];

export {
    idValidator,
    emailValidator,
    passwordValidator,
    loginValidator,
    userValidator,
};
