const{Router} = require('express')
const authRouter = Router();
const {registerUser,loginUser,logoutUser,getMe} = require("../controller/user.controller")
const {authUser} = require("../middleware/auth.middleware")
/**
 * @route POST /api/auth/register
 */
authRouter.post("/register",registerUser);

/**
 * @route post /api/auth/login
 * @acces public
 * @description user login by email and password
 */
authRouter.post("/login",loginUser)
/**
 * @route get /api/auth/logout
 * @access private
 * @description logout user by clear the cookis add on blacklist model
 */
authRouter.get("/logout",logoutUser)
/**
 * @route get /api/auth/me 
 * @description get details about the user 
 * @access private
 */
authRouter.get("/get-me",authUser,getMe)


module.exports = authRouter     