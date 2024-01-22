const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    dates: [{
        type: Date,
        default: Date.now
    }],
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
