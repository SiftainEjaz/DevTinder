const express = require("express");
//const auth = require("./middlewares/auth.js");
const connectDB = require("./config/database.js");
const User =  require('./models/user.js');

//Web Server creation
const app = express();
app.use(express.json());

const PORT = 3000;

connectDB().
then(()=>{
    console.log("Database connection established...");
    //Server is listening to incoming request from users
    app.listen(3000, ()=>{
    console.log(`Server is successfully listening on ${PORT}`);
});
}).catch((err)=>{
    console.log("Connection connot be established");
});

app.post("/signup", async (req,res) => {
    //Creating a new instance of the user model
    //console.log(req.body);
    const user = new User(req.body);
    try
    {
        await user.save();
        res.send("User added successfully!");
    }
    catch(err)
    {
        res.status(400).send("Error in adding user!");
    }



    // const user = new User({
    //     firstName : "Virat",
    //     lastName : "Kohli",
    //     emailId : "virat@gmail.com",
    //     password : "Virat1234"
    // });  

    // try{
    //     await user.save();
    //     res.send("User Added Successfully!");
    // }
    // catch(err)
    // {
    //     res.status(400).send("Error in saving user!" + err.message);
    // }
})
















//Request Handlers

// app.use("/admin/getAllData",auth,(req,res)=>{
//     res.send("ALL USER DATA SENT!");
// });


//Error Handling Scenario

// app.get("/getUserData",(req,res)=>{
//     //Logic for DB Call and get User data
//     throw new Error("DB Exception Found");
//     res.send("USer Data");
// })

// app.use("/",(err,req,res,next)=>{
//     if(err)
//     {
//         res.status(500).send("Error handled via error handler")
//     }
// })




//Params
// app.get('/user/:userId/:name/:password',(req,res)=>{
//     //console.log(JSON.stringify(req.query));
//     console.log(JSON.stringify(req.params));
//     res.send({"firstname" : "Siftain",
//         "lastname" : "Ejaz"
//     })
// })

//Query
// app.get("/user",(req,res)=>{
//     console.log(JSON.stringify(req.query));
//     res.send("Query Params fetched!")
// })





