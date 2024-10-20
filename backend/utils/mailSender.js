const nodemailer = require('nodemailer');
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "checkwell24@gmail.com",
                pass: process.env.APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        let info = await transporter.sendMail({
            from: 'checkwell24@gmail.com',
            to: email,
            subject: title,
            html: body,
        });
        return info;
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = mailSender;