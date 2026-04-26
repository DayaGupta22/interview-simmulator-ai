const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");
const {rateLimit} = require("express-rate-limit");
const User = require("./models/user.models.js")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser())
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})
app.use(limiter);


// all the router herer
const authRouter = require("./routes/user.routes")
app.use("/api/auth",authRouter)

// app.post("/api/auth/login", async (req, res) => {
// 	console.log(req.body)
//    const { email, password } = req.body;

//    const user = await User.findOne({ email });

//    if (!user) {
//       return res.status(404).json({ message: "User not found" });
//    }

//    // ⚠️ If you forget response → request will hang forever
//    res.status(200).json({ message: "Login successful" });
// });

const interviewRouter =require("../src/routes/interview.route.js")
app.use("/api/interview",interviewRouter)
module.exports  = app;
