import asyncHandler from "../utils/error-response/async-handler.js";
import ApiResponse from "../utils/error-response/response.js";

const healthcheck = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, "Server is running fine"));
})

export {
    healthcheck
}