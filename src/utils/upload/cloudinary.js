import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Upload an image
const uploadFileCloudinary = async (filepath) => {
    const uploadResult = await cloudinary.uploader
    .upload(
        filepath
    )
    .catch((error) => {
        console.log(error);
    });

}

