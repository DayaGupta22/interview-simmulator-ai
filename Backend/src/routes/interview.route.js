const express = require ("express");
const authMiddleware = require("../middleware/auth.middleware")
const interviewRouter  = express.Router();
const interviewController = require('../controller/interview.controller')
const upload = require("../middleware/file.middleware")
/**
 * @Route post /api/interview
 * @description generate new interview report on the basis 
 * of user self description resume pdf and job description
 * @access private  
 */
interviewRouter.post("/", authMiddleware.authUser,upload.single('resume'),interviewController.genrateInteriewReportController)





module.exports= interviewRouter 