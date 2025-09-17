import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import ApiError from "../utils/error-response/error.js";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username can't be empty"],
            unique: [true, "This username already exists"],
            trim: true,
            minLength: [3, "Username must be atleast 3 characters long"],
            maxLength: [20, "Username can't exceed 20 characters"],
            match: [
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores",
            ],
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email can't be empty"],
            unique: [true, "This email alreay exists"],
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
            index: true,
        },
        hash: {
            type: String,
        },
        salt: {
            type: String,
        },
        firstName: {
            type: String,
            trim: true,
            maxLength: [50, "First name can't exceed 50 characters"],
            match: [/^[a-zA-Z]*$/, "First name can only contain letters"],
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: [50, "Last name can't exceed 50 characters"],
            match: [/^[a-zA-Z]*$/, "Last name can only contain letters"],
        },
        profileImg: {
            type: String,
            trim: true,
            default: "https://placehold.co/200x200",
            match: [
                /^(https?:\/\/.+|\/uploads\/.+)/,
                "Profile image must be a valid URL or relative path",
            ],
        },
        phone: {
            type: String,
            trim: true,
            match: [/^[0-9]{10}$/, "Please provide a valid phone number"],
        },
        isEmailVerified: Boolean,
        refreshToken: String,
        emailVerificationToken: String,
        emailVerificationExpiry: Date,
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    { timestamps: true },
);

userSchema
    .virtual("password")
    .set(function (password) {
        if (!password) {
            throw new ApiError(400, "Password is required");
        }
        this._password = password;
        this.salt = crypto.randomBytes(16).toString("hex");
        this.hash = crypto
            .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
            .toString("hex");
    })
    .get(function () {
        return this._password;
    });

userSchema.methods.validatePassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
    return hash === this.hash;
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

userSchema.methods.generateTemporaryToken = function () {
    const tokenString = crypto.randomBytes(20).toString("hex");
    const token = crypto.createHash("sha256").update(tokenString).digest("hex");

    const tokenExpiry = Date.now() + 20 * 60 * 1000;

    return { tokenString, token, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
