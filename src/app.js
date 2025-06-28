const express = require("express");
const auth = require("./middlewares/auth.js");

//Web Server creation
const app = express();

//Server is listening to incoming request from users
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000");
});


//Request Handlers

// app.use("/admin/getAllData",auth,(req,res)=>{
//     res.send("ALL USER DATA SENT!");
// });


//Error Handling Scenario

app.get("/getUserData",(req,res)=>{
    //Logic for DB Call and get User data
    throw new Error("DB Exception Found");
    res.send("USer Data");
})

app.use("/",(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("Error handled via error handler")
    }
})




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





