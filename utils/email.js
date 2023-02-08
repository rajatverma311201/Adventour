const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Rajat Verma <${process.env.GMAIL_NODEMAILER_USER}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // ***************
            // SENDGRID
            // ****************
            return nodemailer.createTransport(
                // service: 'SendGrid',
                // auth: {
                //     user: process.env.SENDGRID_USERNAME,
                //     pass: process.env.SENDGRID_PASSWORD,
                // },

                // {
                //     host: "smtp.sendgrid.net",
                //     port: 587,
                //     auth: {
                //         user: 'apikey',
                //         pass: process.env.SENDGRID_PASSWORD,
                //     },
                // }

                // USING GMAIL SERVICE
                {
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_NODEMAILER_USER,
                        pass: process.env.GMAIL_NODEMAILER_PASS,
                    },
                }
            );
        }
        return nodemailer.createTransport({
            // *************
            // MAILTRAP
            // ***************
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    // Send the actual email
    async send(template, subject) {
        try {
            // 1) Render HTML based on a ejs template
            const html = await ejs.renderFile(
                `${__dirname}/../views/emails/${template}.ejs`,
                {
                    firstName: this.firstName,
                    url: this.url,
                    subject,
                }
            );

            // 2) Define email options
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                html: html,
                // text: htmlToText(html, {}),
            };

            // 3) Create a transport and send email
            await this.newTransport().sendMail(mailOptions);
        } catch (err) {
            console.log(err);
        }
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!');
    }

    async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Your password reset token (valid for only 10 minutes)'
        );
    }
};
