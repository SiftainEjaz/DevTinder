const express = require("express");
//const auth = require("./middlewares/auth.js");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");

//Web Server creation
const app = express();


app.use(express.json());  //Coverts JSON into Javascript Object for all route handlers coz. of app.use()
app.use(cookieParser());

const PORT = 3000;
connectDB().
then(()=>{
    console.log("Database connection established...");
    //Server is listening to incoming request from users
    app.listen(PORT, ()=>{
    console.log(`Server is successfully listening on ${PORT}`);
});
}).catch((err)=>{
    console.log("Connection connot be established");
});

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

















//GET all users by same email
// app.get("/user",async (req,res) => {
//     const userEmail = req.body.emailId;
//     try
//     {
//         const user = await User.find({emailId : userEmail});
//         if(user.length === 0)
//         {
//             res.status(404).send("User not found!");
//         }
//         else
//         {
//            res.send(user);
//         }
//     }
//     catch(err){
//         res.status(400).send("Something went wrong!");
//     }
// })

// //GET 1st matching user email -> findOne()
// app.get("/userByEmail", async (req,res) => {
//     const userEmail = req.body.emailId;
//     try
//     {
//         const user = await User.findOne({emailId : userEmail});
//         if(!user)
//         {
//             res.status(404).send("User not found!");
//         }
//         else
//         {
//             res.send(user);
//         }
//     }
//     catch(err){
//         res.status(400).send("Something went wrong!");
//     }
// })

// // FEED API => fetches all users in the DB
// app.get("/feed", async (req,res)=>{
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }
//     catch(err){
//         res.status(400).send("Something went wrong!");
//     }
// })

// //Deleting user by id
 

// //Updating user by userId
// app.patch("/user/:userId",async (req,res)=>{
//     const userId = req.params?.userId;
//     const data = req.body;
//     try
//     {
//         const ALLOWED_UPDATES = [
//             "photoUrl",
//             "about",
//             "skills",
//             "age",
//             "password"
//         ]

//         const isAllowedUpdates = Object.keys(data).every((k)=>{
//             return ALLOWED_UPDATES.includes(k);
//         })
//         if(!isAllowedUpdates)
//         {
//             throw new Error("Failed to update!");
//         }
//         if(data.skills?.length>10)
//         {
//             throw new Error("Skills cannot be more than 10!");
//         }

//         //If user wants to update password, then encrypt the password and then save it
//         if(data.password)
//         {
//             data.password = await bcrypt.hash(data.password,10);
//         }

//         const user = await User.findByIdAndUpdate(
//             {_id:userId},
//             data,
//             {runValidators : true}
//         );

//         if(!user)
//         {
//             res.status(404).send("User not found!");
//         }
        
//         res.send("User data updated successfully!");
//     }
//     catch(err)
//     {
//         res.status(501).send(err.message);
//     }
// })


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





