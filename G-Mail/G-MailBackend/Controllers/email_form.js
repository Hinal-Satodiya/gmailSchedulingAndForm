const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'hsatodiya.netclues@gmail.com',
        pass: 'tahh bkle edmi snqm'
    }
});

function sendEmail(req, res) {
    const { file } = req;
    const { to, subject, text } = req.body;

    if (!file || !to || !subject || !text) {
        return res.status(400).send('Missing file, recipient email (to), subject, or text.');
    }

    const mailOptions = {
        from: 'hsatodiya.netclues@gmail.com',
        to: to,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: file.originalname,
                path: file.path
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send email.');
        }
        res.send('Email sent successfully.');
    });
}

module.exports = {
    sendEmail
};
