const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser)


// all the router herer
const authRouter = require("./routes/user.routes")
app.use("/api/auth",authRouter)
const interviewRouter =require("../src/routes/interview.route.js")
app.use("/api/interview",interviewRouter)
module.exports  = app;
