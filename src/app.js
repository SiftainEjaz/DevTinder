const express = require("express");
const auth = require("./middlewares/auth.js");

//Web Server creation
const app = express();

//Server is listening to incoming request from users
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000");
});


//Request Handlers

app.use("/admin",auth,(req,res)=>{
    res.send("ALL USER DATA SENT!");
});
// app.get('/admin/getAllData',(req,res)=>{
//     //Logic to check if the request is autorized
//     res.send("ALL USER DATA SENT!");
// })

app.get('/admin/deleteUser',(req,res)=>{
    //Logic to check if the request is autorized
    res.send("USER DELETED!");
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





