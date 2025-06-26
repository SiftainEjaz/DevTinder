const express = require("express");

//Web Server creation
const app = express();

//Server is listening to incoming request from users
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000");
});


//Request Handlers
app.use("/login",(req,res)=>{
    res.send("LOGIN PAGE");
})
app.use("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/test",(req,res)=>{
    res.send("Hello from the server!");
})

app.use("/hello",(req,res)=>{
    res.send("HELLO HELLO HELLO")
})

