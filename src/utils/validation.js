const validator = require("validator");   //Gives access to built in validators provided by this library like isEmail,isStrongPassword,isURL,etc
const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName)
    {
        throw new Error("First Name and Last Name should be valid!");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Invalid Email ID!");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Please enter Strong Password!");
    }
}

module.exports = {validateSignUpData};