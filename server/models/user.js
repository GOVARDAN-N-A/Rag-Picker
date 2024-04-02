const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
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
    profilePicture: {
        data: Buffer, // This will store the image data
        contentType: String // This will store the MIME type of the image
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String
    },
    location: {
        city: String,
        state: String,
        country: String
    },
    sportsInterests: [String],
    skillLevel: String,
    preferredPlayingTimes: [String],
    contactNumber: String,
    socialMediaProfiles: String,
    bio: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
