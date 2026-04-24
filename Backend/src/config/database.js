const mongoose = require("mongoose")
async function connectDB() {
    try {
        const connecInstance = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("Database connected succesfully ")
        console.log(`MongoDB connected: ${connecInstance.connection.host}`);

    }
    catch (err) {
        console.error("connection failed", err);
        throw err;
    }
};






module.exports= connectDB;