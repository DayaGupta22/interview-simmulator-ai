const User = require('../models/user.models')
const tokenBlackListModel = require("../models/blacklist.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
/**
 * @post 
 * @description register a new user expects username email password
 * @name registeruser
 * @access public 
 * @
 */
async function registerUser(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "provide the username email and password"
        })
    }
    const Isuser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (Isuser) {
        return res.status(400).json({
            message: "user already exist with  this username or email"
        })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hash
    })
    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token)
  return  res.status(201).json({
        message: "user registerd successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
/**
 * @post 
 * @description login  user expects username email password
 * @name loginuser
 * @access public 
 * @
 */
async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "user not Found used original details"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid password or emails"
        })
    }
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token)
   return res.status(200).json({
        message: 'user logged succesfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
/**
 * @post 
 * @description logout user to clear the token on cookies and adding some functionality
 * @name Logoutuser using token blacklisting
 * @access private
 * @
 */
async function logoutUser(req,res){
const token  = req.cookies.token;
if(token){
    await tokenBlackListModel.create({token})
}
res.clearCookie("token");
 return res.status(200).json({
    message:"user logged out successfully"
})

}
/**
 * @controller for get the details of user
 * @route get
 * @description provide the data about the user 
 * 
 */

async function  getMe(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌"
      });
    }

    res.status(200).json({
      message: "User fetched successfully ✅",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error ❌"
    });
  }
};
module.exports = { registerUser,loginUser ,logoutUser,getMe }