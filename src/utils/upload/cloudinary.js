import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import logger from "../logging/logger.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

// Configuration
if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_SECRET
) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });
}

// Upload file
const uploadToCloudinary = async (filePath) => {
    if (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_SECRET
    ) {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: "auto"
            });
            fs.unlinkSync(filePath);
            return result;
        } catch (error) {
            logger.error(error);
            fs.unlinkSync(filePath);
        } 
    } else {
        return {secure_url: filePath};
    }
};

// Delete file
const deleteFromCloudinary = async (publicId) => {
    try {
        const result = cloudinary.uploader.destroy(publicId);
        return result;
    } catch(error) {
        logger.error(error);
    }
}

export {
    uploadToCloudinary,
    deleteFromCloudinary
}