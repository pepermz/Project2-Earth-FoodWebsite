const express = require('express')
const router = express.Router()
const db = require('../models')


//  localhost:4000/home 
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

// localhost:4000/home/new    
router.get('/new', (req, res) => {
    res.render('new.ejs')
})


// localhost:4000/home/:id
router.get('/:id/', async (req, res, next) => {
    try {
        const foundPost = await db.Post.findById(req.params.id)
        console.log(foundPost);
        const context = { 
            onePost: foundPost,
            message: "Hello there"
        }
        return res.render('show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

//EDIT ROUTE
router.get('/:id/edit', async (req,res, next)=>{
    try {
        const updatedPost = await db.Post.findById(req.params.id);
        console.log(updatedPost);
        const context = {
            post: updatedPost
        }
        return res.render('edit.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})




// POST ROUTE
router.post('/', async (req, res, next) => {
    try {
        // console.log(`The req.body is ${req.body}`)
        const createdPost = await db.Post.create(req.body);
        console.log(`The created post is ${createdPost}`)
        res.redirect('/home');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// UPDATE PUT ROUTE
router.put('/:id', async (req, res, next)=>{
    try {
        const updatedPost = await db.Post.findByIdAndUpdate(req.params.id, req.body);
        console.log(updatedPost);
        return res.redirect(`/home`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// DELETE ROUTE
router.delete('/:id', async (req,res, next)=>{
    try {
        const deletedPost = await db.Post.findByIdAndDelete(req.params.id);
        console.log(deletedPost);
        return res.redirect('/home')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})




module.exports = router