class ApiError extends Error {
    constructor(
        statusCode = 500,
        message = "Something went wrong!",
        errors = {},
        stack = "",
        data = null,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = data;
        this.success = false;

        if(stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;