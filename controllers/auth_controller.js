const express = require('express')
const bcrypt = require('bcryptjs')
require('dotenv').config();
const router = express.Router()
const { User } = require('../models');
const { modelName } = require('../models/Comment');
const { redirect } = require('express/lib/response');

router.get('/login', (req,res) => {
    res.render('auth/login.ejs')
})


// LOGIN ROUTE 
router.post('/login', async function(req,res) {
    try {
        const userFound = await User.findOne({ email: req.body.email })
        console.log(userFound)
        if(!userFound) return res.send('The password or the username is invalid try again')
        const match = await bcrypt.compare(req.body.password, userFound.password)
        if (!match) return res.send("The password or the username is invalid try again")
        req.session.currentUser = {
            id: userFound._id,
            username: userFound.username
        }
        return res.redirect('/home')
    } catch (err) {
        console.log(err)
        req.err = err;
        res.send(err)
    }
})


// RESGISTER ROUTE

router.get('/register', (req,res) => {
    res.render('auth/register.ejs')
})

router.post('/register', async (req,res,next) =>{
    try {
        const userFound = await User.exists({email: req.body.email})
        if (userFound) {
            return res.redirect('/login')
        }
        const salt = await bcrypt.genSalt(12)
        console.log(salt)
        const hash = await bcrypt.hash(req.body.password, salt)
        console.log(hash)
        req.body.password = hash
        const newUser = await User.create(req.body)
        return res.redirect('/login')
    } catch (error) {
        console.log(err)
        req.err = err;
        res.send(err)
    }
})

router.get("/logout", async (req, res) => {
    try {
        await req.session.destroy();
        console.log(req.session);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});


module.exports = router