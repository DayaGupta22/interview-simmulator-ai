const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema")
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_API_KEY
})

// async function invokeGeminiAi(){
//     const response = await ai.models.generateContent({
//         model:"gemini-2.5-flash",
//         contents: "hello Gemini ! i want to explaint the gemini what todo "
//     })
//     // console.log(response.text)
// }
const interviewReportSchema = z.object({
    
    matchScore: z.number().describe(" a score between 0 and 100 indicating how well the candidate pro"),
    
    technicalQuestions: z.array(z.object({
        question: z.string().describe("the technical question can be asked in the interview,"),
        intention: z.string().describe("the intention of interviwerbehind askin this wuestion "),
        answer: z.string().describe("How to answer this question ,what points to cover, what apporach to take etc.")

    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them "),
    behavioralQuestions:z.array(z.object({
        question: z.string().describe("the technical question can be asked in the interview,"),
        intention: z.string().describe("the intention of interviwerbehind askin this wuestion "),
        answer: z.string().describe("How to answer this question ,what points to cover, what apporach to take etc.")

    })).describe("Behavioral question  that ca be asked in the interview alongwith their intention and how to answer them  "),
    skillGap: z.array(z.object({
        skill: z.string().describe(" The skill which the candidate is lacking "),
        severity: z.enum(["low", 'medium', "high"]).describe("The everity of this skill gap .i.e ")
    })).describe(" lsit of skill gaps in the candiate profile along with therir severity"),
    preprationPlan: z.array(z.object({
        day: z.number().describe("the day number in the preparation plan ,starting from 1"),
        focus: z.string().describe("the main focus int the prepartion plan e.g data structure "),
        tasks: z.array(z.string()).describe(" list of tasks to be done on this day to follow the preparation plan e.g read a specific book"),

    })).describe("A day wise prepartion plan for the candidate to follow in order to prepare for the interview effective")


})
async function genrateInterviewreport({ resume, selfDescription, jobDescription }) {
    const prompt = `Genrate an interview report for a candiate with the following details:
        Resume:${resume}
        self describe:${selfDescription}
        job describe:${jobDescription} 
    `
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
             
        }
    })
    // console.log(response.text);
    return JSON.parse(response.text);
}
module.exports = genrateInterviewreport