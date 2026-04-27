const upload = require("../middleware/file.middleware")
const pdfParse = require("pdf-parse")
const interviewReportModel = require('../models/interviewReport.model')

const genrateInterviewreport = require("../services/ai.service")


async function genrateInteriewReportController(req,res){
    // const resumeFile = req.file
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {selfDescription,jobDescription} =req.body;

    const interviewReportByAi = await genrateInterviewreport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })
    
    const interviewReport =await  interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi // for technical question destructring

    }) 
    res.status(201).json({
        message:"interview report generarted succesfuly",
        interviewReport

    })
}


module.exports = {genrateInteriewReportController}