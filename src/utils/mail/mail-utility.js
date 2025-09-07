import logger from "../logging/logger";
import { generateMail } from "./mail-data";

const sendMail = async (data) => {
    const { subject, textContent, htmlContent } = generateMail(data);

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