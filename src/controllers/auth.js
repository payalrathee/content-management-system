import asyncHandler from "../utils/error-response/async-handler.js";
import { userJson } from "../services/user.js";
import { loginUserService, registerUserService } from "../services/auth.js";
import ApiResponse from "../utils/error-response/response.js";

const registerUser = asyncHandler(async (req, res) => {
    const userData = req.body;
    
    if(req.file) {
        userData.profileImgData = req.file;
    }

    const user = await registerUserService(userData);

    res.status(201).json(
        new ApiResponse(201, "User registered successfully!", {
            user: await userJson(user),
        }),
    );
});

const loginUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;

    const {user, accessToken, refreshToken} = await loginUserService(username, email, password);

    const options = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
        new ApiResponse(200, "User logged in successfully!", {
            user: await userJson(user),
            accessToken,
            refreshToken,
        }),
    );

})

export { registerUser, loginUser };
