const express = require("express");
const requestRouter  = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

//Sending Connection Request
requestRouter.post("/request/send/:status/:userId" , userAuth , async (req,res) => {
    try
    {
        const loggedInUser = req.user;
        const fromUserId = loggedInUser._id;
        const toUserId = req.params.userId;
        const toUser = await User.findById(toUserId);
        if(!toUser)
        {
            return res.status(404).json({message : "User not found!"});
        }
        const status = req.params.status;

        const ALLOWED_STATUS = ["interested" , "ignored"];
        if(!ALLOWED_STATUS.includes(status))
        {
            return res.status(400).json({message : "Invalid Status Type : " + status});
        }

        //Check whether connection is already present in DB
        const connectionPresent = await ConnectionRequest.findOne({
            $or:
            [
                {fromUserId, toUserId},
                {fromUserId : toUserId,
                 toUserId : fromUserId},
            ] 
        })

        if(connectionPresent)
        {
            return res.status(400).json({message : "Connection already exists!"})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();
        res.json({
            message: `${loggedInUser.firstName} has set STATUS : ${status} for ${toUser.firstName}`,
            data
            })
    }
    catch(err)
    {
        res.status(400).send("ERROR :" +err.message);
    }
})

module.exports = requestRouter;