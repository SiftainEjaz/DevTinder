const express = require("express");

//Web Server creation
const app = express();

//Server is listening to incoming request from users
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000");
});


//Request Handlers

app.use('/test',(req,res)=>{
    res.send("Hello from Server!");
})


app.get('/user',(req,res)=>{
    res.send({"firstname" : "Siftain",
        "lastname" : "Ejaz"
    })
})

app.post("/user",(req,res)=>{
    console.log("Saved data to the database.");
    res.send("Data successfully!");
})

app.delete("/user",(req,res)=>{
    res.send("User deleted successfully.")
})

