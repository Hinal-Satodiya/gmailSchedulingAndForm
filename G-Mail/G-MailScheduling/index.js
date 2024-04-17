const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cron = require('cron').CronJob;
const mysql = require('mysql');

const PORT = process.env.PORT || 5000

app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log("Server Started : "+ PORT)
});

let countEmail = 0;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'g-mail' 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587, 
    secure: false, 
    auth: {
        user: 'hsatodiya.netclues@gmail.com',
        pass: 'pefb iydc hiom ookf' 
    }
});

const sendEmail = () => {
    countEmail++;
    console.log("Function Start")
    let mailOptions = {
    from: 'hsatodiya.netclues@gmail.com', // sender address
    to: "hinalsatodiya@gmail.com", // list of receivers
    subject: "Nodemailer Task", // Subject line
    text: "Hello Sir, Hope this email finds you well ! I successfully completed the given task of performing CRUD Operations and attaching my files to this email. Please Verify My Task And Give Us Feedback. Thanks & Regards, Hinal Satodiya (NC0645)" +countEmail, // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [
        {
            filename: 'hinal.png',
            path: 'hinal.png',
            contentType: 'image/jpeg',
        }
        
    ]
    };

    console.log("check")
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Scheduled email with attachments sent: %s', info.messageId);
            //ecount table and counter column
            connection.query('INSERT INTO ecount (counter) VALUES (?)', [countEmail], (err, result) => {
                if (err) {
                    console.error('Error inserting into database:', err);
                } else {
                    console.log('Email sending data inserted into database',result);
                }
            });
        }
    });
}

//send mail in every minute
const job = new cron('* * * * *', () => {
    console.log('Sending scheduled email...');
    sendEmail();
});

console.log('Start Sennding...');
job.start();