const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");


//signup for new users
authRouter.post("/signup", async (req,res) => {
    //Creating a new instance of the user model
    try
    {
        //Schema Validation
        validateSignUpData(req);

        //Password Encryption
        const {firstName, lastName, emailId, password} = req.body;  //Request Object Destructuring
        const passwordHash = await bcrypt.hash(password,10);    //10 -> Salt rounds

        const user = new User({
            firstName ,
            lastName ,
            emailId ,
            password : passwordHash
        });
    
        await user.save();
        res.send("User added successfully!");
    }
    catch(err)
    {
        res.status(400).send("ERROR : " +err.message);
    }  
})

//Login for existing user
authRouter.post("/login",async (req,res)=>{
    try
    {
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId : emailId});

        if(!user)
        {
            throw new Error("Invalid Credentials!");
        }
        const isPasswordCorrect = await user.validatePassword(password); 
        if(!isPasswordCorrect)
        {
            throw new Error("Invalid Credentials!");
        }
        else
        {
            //Add the token to cookie and send the response back to the user alongwith the token
            const token = await user.getJWT();  //Gets the token
            res.cookie("token",token);          //cookie sent back to the user
            res.send("Login Successful!");
        }
        
    }
    catch(err)
    {
        res.status(400).send("ERROR : " +err.message);
    }
})

authRouter.post("/logout", async (req,res)=>{
    res.clearCookie("token");
    //res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("User Logged out!!");
})


module.exports = authRouter;