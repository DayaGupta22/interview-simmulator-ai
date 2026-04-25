
const mongoose = require("mongoose ");




const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "technical question is true"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false

})
const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "technical question is true"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})


const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "skill is required"]
    },
    severity: {
        type: String,
        required: [true, "low", "medium", "high"]
    },

}, {
    _id: false
})
const preprationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "day is required"]
    },
    focus: {
        type: String,
        required: [true, "focus is requires"]
    },
    tasks: [{
        type: String,
        required: [true, "task is required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        require: [true, "job description is required"],
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema0],
    skillGaps: [skillGapSchema],
    preprationPlan: [preprationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{ timestamps: true})
const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema);
module.exports = interviewReportModel;
