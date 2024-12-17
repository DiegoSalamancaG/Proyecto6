const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Conectado a MongoDB!")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB;