const express = require('express')
const {
    getbreathingTestResult,
    createBreathingTestResult
}=require('../controllers/breathinTestController')

const router = express.Router()

//get all results
router.get('/', getbreathingTestResult)

//post a new result
router.post('/', createBreathingTestResult)

//delete results
router.delete('/', (req, res)=>{
    res.json({mssg: 'delete results'})
})

module.exports = router