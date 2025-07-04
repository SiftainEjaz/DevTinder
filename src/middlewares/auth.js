const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req,res,next) => {

    try
    {
        //Reading the token from request
        const {token} = req.cookies;
        if(!token)
        {
            throw new Error("Invalid Token!!!");
        }

        //Validate Token
        const decodedObj = await jwt.verify(token,"Saif$123");

        //Find the user
        const {_id} = decodedObj;
        const user = await User.findById(_id); 
        if(!user)
        {
            throw new Error("User not found");
        }
        req.user = user;  //Attach the authenticated user to my req body so that it can be used later
        next();
    }
    catch(err)
    {
        res.status(400).send("ERROR : " +err.message);
    }
}

module.exports = {userAuth};