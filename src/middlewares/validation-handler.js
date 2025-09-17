import { validationResult } from "express-validator";
import ApiError from "../utils/error-response/error.js";

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let formattedErrors = [];

        errors.array().forEach((error) => {
            formattedErrors.push({
                field: error.path,
                message: error.msg,
            });
        });

        return res
            .status(400)
            .json(
                new ApiError(400, null, { fieldErrors: formattedErrors }),
            );
    }

    next();
};

export default validationHandler;
