const express = require('express');
const Attendance = require('../Models/Attendence');
const User = require('../models/User');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

// Attendance Route for marking attendance today
const moment = require('moment'); // Import the moment library for date handling
// Router For Create Attendence
router.post('/attendance', fetchUser, async (req, res) => {
    try {
        const { Mark } = req.body;
        const userId = req.user.id;
        const todayDate = moment().startOf('day'); // Get the current date without time

        // Check if the user has already marked attendance today
        const existingAttendance = await Attendance.findOne({
            user: userId,
            dates: { $gte: todayDate.toDate(), $lt: moment(todayDate).endOf('day').toDate() },
        });

        if (existingAttendance) {
            // User has already marked attendance today, send a message
            return res.status(400).send('You have already marked attendance today');
        }

        // User hasn't marked attendance today, proceed to save
        const attendance = await Attendance.findOneAndUpdate(
            { user: userId },
            { $push: { dates: todayDate.toDate() }, $set: { Mark } },
            { upsert: true, new: true }
        );

        res.status(200).send('Attendance saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving attendance');
    }
});


// Route to Add a new attendence
router.post('/attendancedate/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { date } = req.body;
        // Find the user's attendance document
        const attendance = await Attendance.findOne({ user: userId });
        if (!attendance) {
            return res.status(404).send('Attendance document not found for the user');
        }

        // Check if the date already exists in the array
        if (attendance.dates.includes(new Date(date).toDateString())) {
            return res.status(404).send('Attendance already marked for this user on the specified date');
        }

        // User hasn't marked attendance on the specified date, proceed to save
        attendance.dates.push(new Date(date));
        await attendance.save();

        res.status(200).send('Attendance saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving attendance');
    }
});


// Route to Get Al attendence of a user
router.get('/getattendance', async (req, res) => {
    try {
        // Find attendance records and populate user details
        const userAttendance = await Attendance.find().populate('user', 'name email');

        res.status(200).json(userAttendance);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving attendance');
    }
});

// /Update Route 
router.put("/updateAttendance/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const { dateIndex, date } = req.body;
  
      const existingAttendance = await Attendance.findOne({ user: userId });
  
      if (!existingAttendance) {
        return res.status(404).send("Attendance record not found");
      }
  
      if (typeof dateIndex === 'number' && dateIndex >= 0 && dateIndex < existingAttendance.dates.length) {
        existingAttendance.dates[dateIndex] = date || existingAttendance.dates[dateIndex];
      } else {
        return res.status(400).send("Invalid dateIndex");
      }
  
      const updatedAttendance = await existingAttendance.save();
  
      res.send(updatedAttendance);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating attendance");
    }
  });
  



// Delete Route
router.delete('/deleteAttendance/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const dateToDelete = req.params.date;
  
      // Delete the attendance for the specified user and date
      const deletedAttendance = await Attendance.findOneAndDelete({
        user: userId,
      });
  
      if (!deletedAttendance) {
        return res.status(404).send('Attendance not found for the specified date');
      }
  
      res.send('Attendance deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting attendance');
    }
  });
//   Dlete date one By one
router.delete('/deleteAttendance1/:userId/:dateIndex', async (req, res) => {
    try {
      const userId = req.params.userId;
      const dateIndex = req.params.dateIndex;
  
      const existingAttendance = await Attendance.findOne({ user: userId });
  
      if (!existingAttendance || dateIndex < 0 || dateIndex >= existingAttendance.dates.length) {
        return res.status(404).send('Attendance not found for the specified date');
      }
  
      existingAttendance.dates.splice(dateIndex, 1);
      await existingAttendance.save();
  
      res.send('Attendance date deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting attendance date');
    }
  });
  


//   Route To get Spacific user Attendance
router.get("/getattendanceone", fetchUser, async (req, res) => {
    try {
        const note = await Attendance.find({ user: req.user.id });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server arror occure");
    }

})
module.exports = router;
