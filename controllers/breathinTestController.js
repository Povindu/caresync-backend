const breathingTest = require('../models/breathingTestModel')

//get results
const getbreathingTestResult = async (req, res)=>{
    const breathingResults = await breathingTest.find({}).sort({createdAt: -1})
    res.status(200).json(breathingResults)
}

//post result
const createBreathingTestResult = async(req, res)=>{
    const {date, stopwatchTime} = req.body

    //add doc to db
    try{
        const breathing = await breathingTest.create({date,stopwatchTime})
        res.status(200).json(breathing)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete results
const deletebreathingTestResults = async(req, res)=>{
    const deleteResults = await breathingTest.deleteMany({})
    res.status(200).json(deleteResults)
}

module.exports ={
    getbreathingTestResult,
    createBreathingTestResult,
    deletebreathingTestResults
}