const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const posts = await db.Post.find({});
        const context = { posts }
        console.log(posts);
        return res.render('index.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});










module.exports = router