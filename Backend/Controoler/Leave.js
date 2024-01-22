const express = require('express');
const Leave = require('../Models/Leave');
const User = require('../models/User');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');


router.post('/leave', fetchUser, async (req, res) => {
    const { reason } = req.body;
    const userId = req.user.id;

    try {
        // Save the leave request in the database using the Leave model with status "pending"
        const leaveRequest = new Leave({
            user: userId,
            reason,
            status: 'pending',
        });
        await leaveRequest.save();

        // Notify the admin (you can implement this based on your notification system)

        res.status(200).json({ message: 'Leave request submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/admin/respond-to-leave', async (req, res) => {
    const { leaveRequestId, response } = req.body;
    try {
        // Update the leave request status based on admin response
        const leaveRequest = await Leave.findById(leaveRequestId);
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        leaveRequest.status = response; // You can use 'accepted' or 'declined' as response values
        await leaveRequest.save();

        // Notify the user about the admin's response (you can implement this based on your notification system)

        res.status(200).json({ message: `Leave request ${response === 'accepted' ? 'accepted' : 'declined'}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/admin/leave-requests', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const leaveRequests = await Leave.find({ user: userId });
        res.status(200).json({ leaveRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// router.get('/admin/leave-requests1', async (req, res) => {
//     try {
//         const leaveRequests = await Leave.find();
//         res.status(200).json({ leaveRequests });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
router.get('/admin/leave-requests1', async (req, res) => {
    try {
        const leaveRequests = await Leave.find({ status: 'pending' });
        res.status(200).json({ leaveRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router