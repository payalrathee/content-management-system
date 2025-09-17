import logger from "../logging/logger.js";
import { generateMail } from "./mail-data.js";
import nodemailer from "nodemailer";

const sendMail = async (data) => {
    const { subject, textContent, htmlContent } = generateMail(data);

    if(!process.env.MAIL_HOST || !process.env.MAIL_PORT || !process.env.MAIL_USER || !process.env.MAIL_PASS) return;

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: data.to,
            subject: subject,
            text: textContent,
            html: htmlContent,
        });

        logger.info("Email sent:", info.messageId);
    } catch (error) {
        logger.error("Failed to send the mail: ", error);
    }
};

export default sendMail;