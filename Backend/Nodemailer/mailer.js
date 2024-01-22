const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kkami5754049@gmail.com', 
        pass: 'xozbxiwsqfbayxcb', 
    }
});

router.post('/send-email', (req, res) => {
    const { userEmail, message } = req.body;

    const mailOptionsUser = {
        from: 'kkami5754049@gmail.com',
        to: userEmail,
        subject: 'Thank you for contacting us!',
        text: 'We have received your message and will get back to you soon.'
    };

    const mailOptionsAdmin = {
        from: 'kkami5754049@gmail.com',
        to: 'kkami5754049@gmail.com',
        subject: 'New Message from Contact Form',
        text: `From: ${userEmail}\n\n${message}`
    };

    transporter.sendMail(mailOptionsUser, (errorUser, infoUser) => {
        if (errorUser) {
            return res.status(500).send(errorUser.toString());
        }
        transporter.sendMail(mailOptionsAdmin, (errorAdmin, infoAdmin) => {
            if (errorAdmin) {
                return res.status(500).send(errorAdmin.toString());
            }
            res.status(200).send('Emails sent successfully!');
        });
    });
});


module.exports = router
