const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const { isStrongPassword } = require('validator');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const jwt_Secret = "HassaisGoodBy";
const fetchUser = require("../middleware/fetchUser")
const { check, validationResult } = require('express-validator');
const multer = require("multer")
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Uploads");

    },
    filename: function (req, file, cb) {
        req.filename = `${Date.now()}-${file.originalname}`;
        cb(null, req.filename);
    }
});
const upload = multer({ storage: storage });
// Rout1 Creating A user with Validation
exports.Sign = [
    check('email', 'Please Enter Your Email').isEmail(),
    check('name', 'Name length should be 10 to 20 characters').isLength({ min: 5 }),
    check('password')
        .isLength({ min: 8, max: 20 }).withMessage('Password length should be between 8 and 20 characters')
        .custom(value => {
            if (!isStrongPassword(value, {
                minLength: 8,
                minLowercase: 0,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false,
            })) {
                throw new Error('Password must contain at least 1 uppercase letter, 1 number, and 1 special character');
            }
            return true;
        }),

    check('role', 'Invalid role').isIn(['user', 'admin']),
    check('companyName').if((value, { req }) => req.body.role === 'admin').notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(401).json({ error: "Sorry, a user with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            const verificationCode = generateVerificationCode();

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                role: req.body.role,
                companyName: req.body.companyName,
                verificationCode: verificationCode
            });

            const data = {
                user: {
                    id: user.id,
                },
            };

            const AuthToken = jwt.sign(data, jwt_Secret);

            await sendVerificationEmail(req.body.email, verificationCode);

            res.json({ AuthToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error occurred");
        }
    }
];

async function sendVerificationEmail(email, verificationCode) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kkami5754049@gmail.com', 
            pass: 'xozbxiwsqfbayxcb', // Your email password or app-specific password
        }
    });

    const mailOptions = {
        from: 'kkami5754049@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Hello Developers, Mehabani furma ke Coding Chorh dain apko Job Nhi mily gi.Bs ghr raho ya Larravell kro Alright tech ky Sth: ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);
}

function generateVerificationCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Route for user login
exports.Login = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter your password').exists(),
    async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: "User does not exist" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Password does not match" });
            }

            const data = {
                user: {
                    id: user.id
                }
            };

            const AuthToken = jwt.sign(data, jwt_Secret);
            const success = true;

            res.json({ success, AuthToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
];

// Route 3 Fetching Error
exports.UserDetail = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching user data");
    }
};


// console.log(Math.random()*100)