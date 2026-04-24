const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")
async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: "token not provided"
        })
    }
    const istokenblacklisted = await tokenBlackListModel.findOne({token})
        if(istokenblacklisted){
            return res.status(400).json({
                message:"token is invalid or blacklisted"
            })
        }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(400).json({
            message: "invalid token"
        })
    }
}

module.exports = { authUser }