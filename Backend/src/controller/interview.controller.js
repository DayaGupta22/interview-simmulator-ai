const upload = require("../middleware/file.middleware")
const pdfParse = require("pdf-parse")
const interviewReportModel = require('../models/interviewReport.mode')

const genrateInterviewreport = require("../services/ai.service")


async function genrateInteriewReportController(req,res){
    const resumeFile = req.file
    const resumeContent = pdfParse(req.file.buffer)
    const {selfDescription,jobDesription} =req.body;

    const interviewReportByAi = await genrateInterviewreport({resumeContent,selfDescription,jobDescription})
    const interviewReport =await interviewReportModel.create({
        user :req.user.id
    })
}


module.exports = {genrateInteriewReportController}