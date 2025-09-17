import { User } from "../models/user.js";
import ApiError from "../utils/error-response/error.js";
import sendMail from "../utils/mail/mail-utility.js";
import { uploadToCloudinary } from "../utils/upload/cloudinary.js";
import fs from "fs";

const registerUserService = async (userData) => {
    try {
        // Check if user exists already
        const existingUser = await User.findOne({
            $or: [{ email: userData.email }, { username: userData.username }],
        });

        if (existingUser) {
            throw new ApiError(
                400,
                "User with given email or username already exists!",
            );
        }

        // Create user
        let user = await User.create(userData);

        if (!user) {
            throw new ApiError(
                500,
                "Unable to register the user, please try again.",
            );
        }

        if (userData.profileImgData) {
            const file = userData.profileImgData;
            const uploadResult = await uploadToCloudinary(file.path);
            if (uploadResult) {
                user.profileImg = uploadResult.secure_url;
            }
        }

        // Send emails
        sendMail({
            type: "accountConfirmation",
            to: user.email,
        });

        const { tokenString, token, tokenExpiry } =
            user.generateTemporaryToken();
        user.emailVerificationToken = token;
        user.emailVerificationExpiry = tokenExpiry;
        user.isEmailVerified = false;

        sendMail({
            type: "emailVerification",
            to: user.email,
            token: tokenString,
        });

        user = await user.save({ validateBeforeSave: false });

        return user;
    } catch (error) {
        if (userData.profileImgData) {
            fs.unlinkSync(userData.profileImgData.path);
        }
        throw error;
    }
};

const loginUserService = async (username, email, password) => {
    if (!(username || email) || !password) {
        throw new ApiError(400, "Required fields are empty");
    }

    let user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isValid = user.validatePassword(password);
    if (!isValid) {
        throw new ApiError(401, "Bad credentials");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user = await user.save({validateBeforeSave: false});

    return { user, accessToken, refreshToken };
};

export { registerUserService, loginUserService };
