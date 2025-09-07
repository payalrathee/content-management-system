import winston from "winston";

const isDev = process.env.NODE_ENV !== "production";

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
);

const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({ level, message }) => {
        return `[${level}] ${message}`;
    }),
);

const logger = winston.createLogger({
    level: isDev ? "debug" : "info",
    format: fileFormat,
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
        }),
    ],
});

if (isDev) {
    logger.add(
        new winston.transports.Console({
            format: consoleFormat,
            level: "error",
        }),
    );
}

export default logger;
