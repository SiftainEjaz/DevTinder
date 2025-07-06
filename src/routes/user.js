const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");

//Get all pending connection requests for the loggedIn USer
userRouter.get("/user/requests/received", userAuth , async (req,res) => {

   try
   {
        const loggedInUser = req.user;
        //In the CR DB, toUserId = loggedinUser._id and status = interested

        const connectionRequests = await ConnectionRequest.find(
            {toUserId : loggedInUser._id , 
             status : "interested"}).populate("fromUserId" , "firstName lastName age gender about photoUrl");
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

module.exports = userRouter;
