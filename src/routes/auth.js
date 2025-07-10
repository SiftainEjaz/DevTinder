const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");


//signup for new users
authRouter.post("/signup", async (req,res)=> {
    try
    {
        //Step-1:- Validate incoming data from user if it is valid or not
        validateSignUpData(req);
        //Mandatory -> firstName,lastName,emailId,password
        //Optional -> gender,age,skills,photoUrl,about
        const {firstName,lastName,emailId,password,age,skills} = req.body;

        //Step-2:- Encrypt password
        const hashedPassword = await bcrypt.hash(password,10);
        //Step-3:- Store data in the DB
        const user = new User ({
            firstName,
            lastName,
            emailId,
            password : hashedPassword,
            age,
            skills
        })
        
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
    //User will enter emailId and password
    
    try
    {
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user)
        {
            throw new Error("Invalid credentials!");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid)
        {
            throw new Error("Invalid credentials!");
        }

        //If both are valid, then create a token, attach it to cookie and send in response
        const token = await user.getJWT();
        res.cookie("token",token);
        res.send("Login successful!");
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