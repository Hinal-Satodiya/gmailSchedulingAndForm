const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');



const app = express();
app.use(cors());
const port = 5000;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'hsatodiya.netclues@gmail.com',
        pass: 'tahh bkle edmi snqm'
    }
});

app.post('/send', upload.single('file'), (req, res) => {
    const { file } = req;
    const { to, subject , text} = req.body;

    if (!file || !to || !subject || !text) {
        return res.status(400).send('Missing file, recipient email (to), or subject.');
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
    console.log(text);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send email.');
        }
        res.send('Email sent successfully: ');
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});