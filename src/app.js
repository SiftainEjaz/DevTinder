const express = require("express");

//Web Server creation
const app = express();

//Server is listening to incoming request from users
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000");
});


//Request Handlers

//Params
app.get('/user/:userId/:name/:password',(req,res)=>{
    //console.log(JSON.stringify(req.query));
    console.log(JSON.stringify(req.params));
    res.send({"firstname" : "Siftain",
        "lastname" : "Ejaz"
    })
})

//Query
// app.get("/user",(req,res)=>{
//     console.log(JSON.stringify(req.query));
//     res.send("Query Params fetched!")
// })





