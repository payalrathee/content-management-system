import Mailgen from "mailgen";

const generateMail = (data) => {

    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: process.env.APP_NAME || "",
            link: process.env.APP_URL || "",
            logo: process.env.APP_LOGO || "",
        },
    });

    let subject = "";
    let content = {};
    switch (data.type) {
        case "accountConfirmation":
            subject = "Thank you for registering!";
            content = {
                body: {
                    name: data.username || "User",
                    intro: "Welcome! We're very excited to have you on board.",
                    action: {
                        instructions: "Click here to get started:",
                        button: {
                            color: "#22BC66",
                            text: "Get Started",
                            link: `${process.env.CLIENT_URL}`,
                        },
                    },
                    outro: "If you didn’t create an account with us, you can safely ignore this email.",
                },
            };
            break;

        case "emailVerification":
            subject = "Verify your email address";
            content = {
                body: {
                    name: data.username || "User",
                    intro: "Thanks for signing up! Before you get started, we need to verify your email address.",
                    action: {
                        instructions:
                            "Please verify your email by clicking the button below:",
                        button: {
                            color: "#3869D4",
                            text: "Verify Email",
                            link: `${process.env.CLIENT_URL}/verify-email/${data.token}`,
                        },
                    },
                    outro: "If you did not request this, please ignore this email.",
                },
            };
            break;

        default:
            subject = "Notification from our service";
            content = {
                body: {
                    name: data.username || "User",
                    intro: "This is a system notification.",
                    outro: "You can safely ignore this email if it wasn’t intended for you.",
                },
            };
    }


    const textContent = mailGenerator.generatePlaintext(content);
    const htmlContent = mailGenerator.generate(content);

    return {subject, textContent, htmlContent};
    
};

export {generateMail};