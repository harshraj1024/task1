const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    admitDate: { type: Date, required: true },
    admitTime: { type: String, required: true },
    files: { type: Array, required: true },
    gender: { type: String, required: true },
    note: { type: String }
});

// Define the user model
const User = mongoose.model('User', userSchema);

// Define the route for submitting user data
router.post('/Create', upload.array('files'), async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, admitDate, admitTime, gender, note } = req.body;
        const files = req.files.map(file => file.filename);

        const user = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            admitDate,
            admitTime,
            files,
            gender,
            note
        });

        await user.save();
        res.send('User saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
