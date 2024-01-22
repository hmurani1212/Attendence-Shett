// models/User.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true // 'role' is mandatory for all users
    },
    companyName: {
        type: String,
        required: function () {
            return this.role === 'admin'; // 'companyName' is required only if the role is 'admin'
        }
    }
});

module.exports = mongoose.model("User", UserSchema);
