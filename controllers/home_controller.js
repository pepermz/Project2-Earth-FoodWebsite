const { default: axios } = require('axios');
const express = require('express')
const router = express.Router()
const db = require('../models')
const options = {
    method: 'GET',
    url: 'https://yummly2.p.rapidapi.com/feeds/list',
    params: {limit: '24', start: '0'},
    headers: {
      'X-RapidAPI-Host': 'yummly2.p.rapidapi.com',
      'X-RapidAPI-Key': 'c6033753cfmsh7b8d0b8ce2f702cp17feaajsn8d2efb4d4847'
    }
  };

//  localhost:4000/home 
router.get('/', async (req, res, next) => {
    try {
        const posts = await db.Post.find({});
        const response = await axios.request(options)
        const recipes = response.data.feed
        const context = { posts, recipes }
        return res.render('index.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// localhost:4000/home/new    
router.get('/new', (req, res) => {
    res.render('/pages/new.ejs')
})
//route to populate cards
router.get('/populate', (req,res) => {
    //*****his will delete all cards's API if uncommented*****
    // const posts = await db.Post.find({});
    // for(let idx=0; idx < posts.length; idx++){
    //     const post = posts[idx]
    // await db.Post.findByIdAndDelete(post._id);
    // await db.Comment.findByIdAndDelete(post._id)
    // }
    //from Yummly's- code snippet to acquire their api database 
    //https://rapidapi.com/apidojo/api/yummly2/ 
    const options = {
        method: 'GET',
        url: 'https://yummly2.p.rapidapi.com/feeds/list',
        params: {limit: '24', start: '0'},
        headers: {
          'X-RapidAPI-Host': 'yummly2.p.rapidapi.com',
          'X-RapidAPI-Key': 'c6033753cfmsh7b8d0b8ce2f702cp17feaajsn8d2efb4d4847'
        }
      };
      //looping through list to create recipe feed
      axios.request(options).then(function (response) {
        const recipes = response.data.feed;
        for(let idx=0; idx < recipes.length; idx++){
            const recipe = recipes[idx]
            const source = recipe.display.source['sourceRecipeUrl'] 
            console.log(source)
            //grabbing display name and image
            if (typeof recipe.display.displayName !== 'undefined'){
                //body = defined by post.js/schema
            const body = { name: recipe.display.displayName, description: recipe.display.displayName, image: recipe.display.images[0], source}
            db.Post.create(body);
            }
        }
    }).catch(function (error) {
        console.error(error);
    });  
    //redirecting to home
    res.redirect('/home');  
})

// localhost:4000/home/:id
router.get('/:id', async (req, res, next) => {
    try {
        const foundPost = await db.Post.findById(req.params.id)
        const allComments = await db.Comment.find({product:req.params.id})
        console.log(allComments[0])
        // console.log(foundPost);
        const context = { 
            onePost: foundPost,
            comments: allComments,
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
        return res.render('pages/edit.ejs', context)
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
        if (!deletedPost){
            await db.Comment.findByIdAndDelete({product: req.params.id})
        }
        return res.redirect('/home')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})




module.exports = router