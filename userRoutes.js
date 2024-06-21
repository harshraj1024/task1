const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const User = require('./models/User');

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
