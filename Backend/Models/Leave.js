const mongoose = require('mongoose');
const { Schema } = mongoose;

const LeaveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reason: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        require: true,
    },
});


module.exports = mongoose.model('Leave', LeaveSchema);
