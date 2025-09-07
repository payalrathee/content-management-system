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
    switch(data.type) {
        case "register": 
            subject = "";
            content = {
                body: {
                    name: "John Appleseed",
                    intro: "Welcome to Mailgen! We're very excited to have you on board.",
                    action: {
                        instructions:
                            "To get started with Mailgen, please click here:",
                        button: {
                            color: "#22BC66", // Optional action button color
                            text: "Confirm your account",
                            link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
                        },
                    },
                    outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
                },
            };
            break;
        case "verifyEmail":
            break;
        default:
    }

    const textContent = mailGenerator.generatePlaintext(content);
    const htmlContent = mailGenerator.generate(content);

    return {subject, textContent, htmlContent};
    
};

export {generateMail};