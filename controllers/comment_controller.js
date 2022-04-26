const express = require('express')
const router = express.Router()
const db = require('../models')

// INDEX
router.get('/', async (req,res, next)=>{
    // res.send('hitting review index')
    try {
        const allComments = await db.Comment.find({})
        res.send(allComments)

    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

// NEW
router.get('/new', async (req,res, next)=>{

    try {
        const allPost = await db.Post.find({})
        // console.log(allProducts)
        const context ={post: allPost}
        res.render('comments/new.ejs', context)

    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

// CREATE
router.post('/', async (req,res, next)=>{
    try{
        const newCommentData = req.body
        const newComment = await db.Comment.create(newCommentData)
        console.log(newComment)
        // res.redirect('/reviews')
        res.redirect(`/home/${newComment.post}`)
        // return user to product detail page -> 
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

// SHOW
router.get('/:commentId', async (req, res, next) => {
    try {
        const foundComment = await db.Comment.findById(req.params.reviewId).populate('post')
        res.render('comments/show.ejs', {comment: foundComment})
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

//PUT 
router.put('/:commentId', async (req,res, next)=>{
    res.send('comment update: '+req.params.reviewId)
})

// edit - GET - serve an edit.ejs
router.get('/:commentId/edit', async (req,res, next)=>{
    res.send('hitting review edit: '+req.params.reviewId)
})

//DELETE
router.delete('/:commentId', async (req,res, next)=>{
    // res.send('hitting review delete: '+req.params.reviewId)
    try{
       const deleteComment = await db.Comment.findByIdAndDelete(req.params.reviewId)
       console.log(deleteComment.id, "<<comment |",deleteComment.post,"<<post") 
       res.redirect('/home/'+deleteComment.post)
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router