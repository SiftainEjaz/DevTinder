const mongoose = require('mongoose');
const validator = require("validator");

//timestamps gives createdAt and updatedAt for all new records added
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,   //Performs mandatory check
        minLength : 4,     //minimum length 
        maxLength : 50,
        trim:true
    },
    lastName : {
        type : String,
        trim:true,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,    //Uniqueness check on emailID
        lowercase : true, //Converts all uppercase to lowercase
        trim : true,      //Trims starting and ending spaces
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email address: " +value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Password is not Strong!");
            }
        }
    },
    age : {
        type : Number,
        min : 18,        //min (for numbers)
    },
    gender : {
        type : String,
        //Validate function by default works only on new object creation
        //To turn it on for PATCH or PUT, add  (options) as {runValidators : true} in the route handler
        validate(value){    
           if(!["Male","Female","Others"].includes(value)){
            throw new Error("Invalid Gender! Please enter Male, Female or Other.");
           }
        }
    },
    photoUrl :{
        type : String,
        default : "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL!");
            }
        }
    },
    about : {
        type : String,
        default : "This is a default about of user"
    },
    skills : {
        type : [String]
    }
},
{timestamps : true}
);

//const User = mongoose.model("User",userSchema);
//module.exports = User;
//     OR 

module.exports = mongoose.model("User",userSchema);