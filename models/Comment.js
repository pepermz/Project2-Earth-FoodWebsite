const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default:0,
        min: 0,
        max: 10,
        required: true
    },
    content: {
        type: String,
        required: [true, 'You must provide a comment']
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }

}, {timestamps: true})





const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment