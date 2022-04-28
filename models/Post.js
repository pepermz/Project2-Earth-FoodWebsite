const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty!']
    },
    description: {
        type: String,
        required: [true, 'description cannot be empty']
    },
    image: {
        type: String,
        required: [true, 'image cannot be empty']
    },
    source: {
        type: String,
        default: 'http://localhost:4000/home'   
    }
}, 
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post