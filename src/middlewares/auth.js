const adminAuth = (req,res,next)=>{
    console.log("Authorization check.....")
    const token = "xy";
    const isAuthorized = token === "xyz";
    if(!isAuthorized)
    {
        res.status(401).send("User not authorised");
    }

    else
    {
        next();
    }
}

module.exports = adminAuth;