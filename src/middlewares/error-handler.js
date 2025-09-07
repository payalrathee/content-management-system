import ApiError from "../utils/error-response/error.js";
import logger from "../utils/logging/logger.js";

const errorHandler = (error, req, res, next) => {
    logger.error(error);

    res.status(error.statusCode || 500).json(
        new ApiError(error.statusCode, error.message),
    );
};

export default errorHandler;
