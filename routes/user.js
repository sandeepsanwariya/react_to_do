const express = require("express");
const router = express.Router()
const User = require("../models/user");
const Joi = require("joi");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth =require('./authValidation')
const dotenv=require('dotenv');
dotenv.config()
const salt = 10;
const { registerValidation ,loginValidation} = require("./validator");

const generateToken=(user)=>{
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    user.token = token
    return token
}

router.get('/logout',auth, async(req,res)=>{
    var user=await User.findOne({_id: req.user});
    await user.update({$unset : {token :1}},function(err,user){
        if(err) return res.send(err);
        else {
            res.send('logout success');
    }})
})

router.post('/login', async (req, res) => {
   
    try{
        const { error } =await loginValidation(req.body)
        if (error) { return res.status(400).send(res.send(error.details[0].message)) }
      const user=  await User.findOne({ email: req.body.email })
      if (!user) res.status(404).json("email not registered" )
        else {
            bcrypt.compare(req.body.password, user.password, (error, match) => {

                if (error) res.status(500).json({ error })
                else if (match) res.status(200).json({ 'auth-token': generateToken(user) })
                else res.status(403).json('password do not match')
            })
        }
    }
    catch (err){
        res.status(500).json(err.details[0].message)
    }

});

router.post('/signup', async (req, res) => {
 
        try{
            console.log(req.body)
            const { error } = await registerValidation(req.body)
            console.log('rr',error)
            if (error) { return res.status(400).send(res.send(error.details[0].message)) }
            const user= await User.findOne({ email: req.body.email })
            if (user) res.status(404).json("email already registered")
                     else {
                         bcrypt.hash(req.body.password, salt, (error, hash) => {
                             if (error) res.status(500).json(error)
                             else {
                                 const newUser = User({ email: req.body.email, username: req.body.username, password: hash })
                                 newUser.save()
                                     .then(user => { res.status(200).json({ 'auth-token': generateToken(user) }) })
                                     .catch(err => { res.status(500).json(err),console.log(err) })
                             }
                         })
                     }     
            
       
        }
        catch (err){
            res.status(406).json(err.details[0].message)
        }
     



});

module.exports = router