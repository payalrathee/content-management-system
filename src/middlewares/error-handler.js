import logger from "../utils/logging/logger.js";

const errorHandler = (error, req, res, next) => {
    logger.error(error);

    res.status(error.statusCode || 500).json({
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message || "Something went wrong!",
        errors: error.errors || {},
        data: error.data || null,
        // stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
};


export default errorHandler;
