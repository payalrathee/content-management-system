import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/config.js";
dotenv.config({
    path: "./.env",
});
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const port = process.env.PORT || "3002";

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to database");
        process.exit(1);
    });
