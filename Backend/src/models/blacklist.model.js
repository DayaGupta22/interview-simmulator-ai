const mongoose = require("mongoose");
const blackListSchema = new mongoose.Schema ({
    toke:{
        type:String,
        required:[true ,"token is required to be added in blacklist"]
    }
},{timestamps:true})
const tokenBlackListModel = mongoose.model("blacklistTokens",blackListSchema)

module.exports = tokenBlackListModel