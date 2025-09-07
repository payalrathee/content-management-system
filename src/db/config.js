import mongoose from "mongoose";

async function connectDB() {
    const db_name = "vynk";

    try {
        const conn = mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`);
        console.log(`Connected to database successfully!`);
    } catch (error) {
        console.log("MongoDB error - ", error);
        process.exit(1);
    }
}

export default connectDB;
