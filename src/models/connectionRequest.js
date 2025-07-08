const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
{
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" ,   //referenc to user collection
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", //refernce to 'USER' model
        required : true,
    },
    status : {
        type : String,
        enum : {
            values : ["ignored" , "accepted" , "interested" , "rejected"],
            message : `{VALUE} is incorrect status type`
        },
        required : true,
    }
},
{timestamps : true}
);

connectionRequestSchema.index({fromUserId : 1, toUserId : 1}); //Compound Indexing

connectionRequestSchema.pre("save",function(next){
    const loggedInUser = this;
    if(loggedInUser.fromUserId.equals(loggedInUser.toUserId))
    {
        throw new Error("Cannot send connection request to yourself!");
    }

    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequest;

