const mongoose = require('mongoose');

//timestamps gives createdAt and updatedAt for all new records added
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,   //Performs mandatory check
        minLength : 4,     //minimum length 
        maxLength : 50,
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,    //Uniqueness check on emailID
        lowercase : true, //Converts all uppercase to lowercase
        trim : true,      //Trims starting and ending spaces
    },
    password : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        min : 18,        //min (for numbers)
    },
    gender : {
        type : String,
        //Validate by default works only on new object creation
        //To turn it on for PATCH or PUT, add and options as {runValidators : true} in the route handler
        validate(value){    
           if(!["Male","Female","Others"].includes(value)){
            throw new Error("Invalid Gender! Please enter Male, Female or Other.");
           }
        }
    },
    photoUrl :{
        type : String,
        default : "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png"
    },
    about : {
        type : String,
        default : "This is a default about of user"
    },
    skills : {
        type : [String]
    }
},{timestamps : true});

//const User = mongoose.model("User",userSchema);
//module.exports = User;
//     OR 

module.exports = mongoose.model("User",userSchema);