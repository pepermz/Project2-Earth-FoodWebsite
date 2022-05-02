const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty!'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email cannot be empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty']
    },
    avatar: {
        type: String,
        default: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    },
}, 
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;