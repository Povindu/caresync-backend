const stepCount = require('../models/stepCountModel')

//get results
const getStepCounterTestResult = async(req, res)=>{
    const stepCountResult = await stepCount.find({}).sort({createdAt: -1})
    res.status(200).json(stepCountResult)
}

//post result
const createStepCountResult = async(req,res)=>{
    const {date, stopwatchTime, step} = req.body

    //add doc to db
    try{
        const stepCounter = await stepCount.create({date,stopwatchTime,step})
        res.status(200).json(stepCounter)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete results
const deleteStepCounterTestResult = async(req, res)=>{
    const deleteResult = await stepCount.deleteMany({})
    res.status(200).json(deleteResult)
}

module.exports={
    getStepCounterTestResult,
    createStepCountResult,
    deleteStepCounterTestResult
}