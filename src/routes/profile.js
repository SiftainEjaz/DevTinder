const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const {validateEditRequest} = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

//User(view) profile
profileRouter.get("/profile/view", userAuth , async (req,res)=>{
    try
    {
        const user = req.user;
        res.send(user);
    }
    catch(err)
    {
        res.status(404).send("ERROR : " + err.message);
    }
})

//Updating Profile
profileRouter.patch("/profile/edit" , userAuth ,async (req,res) => {
    
    try
    {
        if(!validateEditRequest(req))
        {
            throw new Error("Invalid Edit Request!");
        }

        //Access whose data is sent in the request
        const loggedInUser = req.user;

        //Assign the updated data present in the request to the fields in DB

        Object.keys(req.body).forEach( (key) => {
            loggedInUser[key] = req.body[key];
        })

        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}'s data updated succesfully!!`)
    }

    catch(err){
        res.status(400).send("ERROR : " +err.message);
    }
})

//Updating password
profileRouter.patch("/profile/password" , userAuth , async (req,res) => {

    try
    {
        const {password} = req.body;
        const loggedInUser = req.user;
        //Comparing old password and new password. throws error if old password is found.
        const isPasswordSame = await bcrypt.compare(password,loggedInUser.password);
        if(isPasswordSame)
        {
            throw new Error("Old password found. Please try again with a new password");
        } 

        if(!validator.isStrongPassword(password))
        {
            throw new Error("Password is not Strong!");
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //update the password in DB
        loggedInUser.password = hashedPassword;

        await loggedInUser.save();
        res.send("Password Changed!");
    }
    catch(err)
    {
        res.status(400).send("ERROR : " +err.message);
    }
    
})



module.exports = profileRouter;
