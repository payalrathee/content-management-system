import { User } from "../models/user.js";

const userJson = async (userId) => {
    return await User.findOne(userId).select(
        "-refreshToken -hash -salt -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry",
    );
};

export {
    userJson
}