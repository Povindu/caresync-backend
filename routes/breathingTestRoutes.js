const express = require('express')
const breathingTest = require('../models/breathingTestModel')

const router = express.Router()

//get all results
router.get('/',(req, res)=>{
    res.json({mssg: 'get all results'})
})

//post a new result
router.post('/',async (req, res)=>{
    const {date, stopwatchTime} = req.body

    try{
        const breathing = await breathingTest.create({date,stopwatchTime})
        res.status(200).json(breathing)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

//delete results
router.delete('/', (req, res)=>{
    res.json({mssg: 'delete results'})
})

module.exports = router