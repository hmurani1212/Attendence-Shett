const mongoose = require("mongoose")


const MongoUrl = "mongodb+srv://Project:Project1234@cluster0.obxjkz6.mongodb.net/Attendence";

const ConnectToMongo = async () => {
    try {
        mongoose.connect(MongoUrl);
        console.log("Mongodb Connected Successifully")
    } catch (error) {
        console.log(error)
    }
}


module.exports = ConnectToMongo