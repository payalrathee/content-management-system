import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./utils/logging/logger.js";

const app = express();

// Basic config
app.use(express.json({ limit: "16kb" }));
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    }),
);
app.use(express.static("public"));
app.use(express.static("uploads/public"));
app.use(cookieParser());

// CORS config
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(","),
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

// Logging
const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                const logInfo = `${logObject.method}: ${logObject.url} - ${logObject.status} (${logObject.responseTime}ms)`;
                logger.info(logInfo);
            },
        },
    }),
);

// Routes
import healthCheckRoute from "./routes/healthcheck.js";
import errorHandler from "./middlewares/error-handler.js";

app.use("/api/v1/healthcheck", healthCheckRoute);

app.use(errorHandler);

export default app;
