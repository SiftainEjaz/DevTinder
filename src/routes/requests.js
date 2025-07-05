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

requestRouter.post("/request/review/:status/:requestId" , userAuth, async (req,res) => {
    //validate requestId exists in db
    //status-interested, only then accept and change status=accepted or rejected based on the API

    try
    {
        //Validate status - accepted or rejected
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        const ALLOWED_STATUS = ["accepted" ,"rejected"];
        if(!ALLOWED_STATUS.includes(status))
        {
            return res.status(400).json({message : "Invalid STATUS Type : " +status});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            status : "interested",
            toUserId : loggedInUser._id,  //User who received the request must be loggedin
            fromUserId : requestId  //User whose ID present in API must be the one who sent it
        })

        if(!connectionRequest)
        {
            return res.status(404).send("No connection requests found!");
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({message : `Connection Request ${status} successfully!`, data});
    }
    catch(err)
    {
        res.status(400).send("ERROR : " +err.message);
    }
})

module.exports = requestRouter;