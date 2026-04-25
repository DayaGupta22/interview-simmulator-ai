require('dotenv').config();
const app = require('./src/app')
const connectDB = require('./src/config/database')
//const invokeGeminiAi= require("./src/services/ai.service")
//const { resume ,jobDescription,selfDescription} =require("./src/services/temp")
connectDB();

//genrateInterviewreport({resume,selfDescription,jobDescription});
// invokeGeminiAi();

app.get("/",(req,res)=>{
    res.send("this file if the trail version of bagackend")
 })
app.listen(3000,(req,res)=>{
    console.log("server running at port :3000")
}); 
console.log('server apn ahi')