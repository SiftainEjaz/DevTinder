const mongoose  = require('mongoose');

const connectDB = async ()=>{
    mongoose.connect(
    "mongodb+srv://Siftain:asfzxtkjKEhteCYo@siftaincluster.voz89.mongodb.net/devTinder"
);
}

module.exports = connectDB;



