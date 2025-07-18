const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

//Get all pending connection requests for the loggedIn USer
userRouter.get("/user/requests/received", userAuth , async (req,res) => {

   try
   {
        const loggedInUser = req.user;
        //In the CR DB, toUserId = loggedinUser._id and status = interested
        const USER_DISPLAY_DATA = "firstName lastName age gender about photoUrl skills";
        const connectionRequests = await ConnectionRequest.find(
            {toUserId : loggedInUser._id , 
             status : "interested"}).select("fromUserId").populate("fromUserId" ,USER_DISPLAY_DATA);
           // populate("fromUserId", ["firstName","lastName"]);
        //Find all the documents that matches the Id
        if(connectionRequests.length==0)
        {
            return res.status(404).json({message : "No pending connection requests found!"});
        }

        res.json({message : "Connection Requests found!",
                  data : connectionRequests}
                );
   }
   catch(err)
   {
    res.status(404).send("ERROR : " +err.message);
   }
})

//Get all the matches or connections for the loggedIn User
userRouter.get("/user/connections", userAuth , async (req,res) => {
    try
    {
        const loggedInUser = req.user;
        const USER_DISPLAY_DATA = "firstName lastName age gender about photoUrl skills";
        //In Conn. Req. DB, fetch all connections having status as accepted and toUserId== loggedInUser._id || fromUSerId : loggedInUser._id
        const matchedConnections = await ConnectionRequest.find({
            $or: [
                {toUserId : loggedInUser._id, status : "accepted"},
                {fromUserId : loggedInUser._id, status : "accepted"}
            ]
        }).populate("fromUserId",USER_DISPLAY_DATA)
          .populate("toUserId" ,USER_DISPLAY_DATA);
        
        if(matchedConnections.length==0)
        {
            return res.status(404).json({message : "No connection found!"});
        }


        const connections = matchedConnections.map(conn => 
        {
            const otherUser = conn.fromUserId._id.equals(loggedInUser._id) ? conn.toUserId : conn.fromUserId;
                return otherUser;
        });

        //Siftain sent to Rahul
        //Rahul Logs in
        //Sees connection request and accepts it
        //Rahul reviews connections
        //fromUserId - Siftain
        //toUser - Rahul
        //Rahul logs out
        //Siftain logs in


        res.json({message : `${matchedConnections.length} connection(s) found!`,
                 data : connections});
    }
    catch(err)
    {
        res.status(400).send("ERROR : " +err.message);
    }
})

userRouter.get("/user/feed" , userAuth , async (req,res) => {

    try
    {
        const loggedInUser = req.user;
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;
        limit = limit > 50? 10 : limit;
        const skip = (page-1) * limit;

        //Should display all user except
        //own profile

        const USER_DISPLAY_DATA = "firstName lastName age gender about photoUrl skills";


        //connection request is sent + received by the user
        const connectionRequests = await ConnectionRequest.find(
            {$or : [ 
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
            }).select("fromUserId toUserId");

        //Get all the unique entries
        const hiddenUserFromFeed = new Set();
        connectionRequests.forEach(connection => {
            hiddenUserFromFeed.add(connection.fromUserId.toString());
            hiddenUserFromFeed.add(connection.toUserId.toString());
        });

        //Excludes the (sent+received) request for loggedInUser and exclude self
        const toDisplayUsers = await User.find({
            $and : [
                {_id : {$nin :  Array.from(hiddenUserFromFeed)}},
                {_id : { $ne : loggedInUser._id}}
            ]}).select(USER_DISPLAY_DATA).skip(skip).limit(limit);
    
        res.json({data : toDisplayUsers});
    }

    catch(err)
    {
        res.status(400).send("ERROR : " +err.message);
    }
})

module.exports = userRouter;
