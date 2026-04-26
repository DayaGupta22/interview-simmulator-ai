// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     username:{
//         type:String,
//         required:[true,"username already taken"],
//         unique:true
//     },
//     email:{
//          type:String,
//         required:[true,"email already exists"],
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     }

// },{timestamps:true})

//  const User = mongoose.model("users",userSchema);
//  module.exports = User
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please use a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

// ✅ Better model name
const User = mongoose.model("User", userSchema);

module.exports = User;