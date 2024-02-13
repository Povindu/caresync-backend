const express = require('express')
const {
    getbreathingTestResult,
    createBreathingTestResult,
    deletebreathingTestResults
}=require('../controllers/breathinTestController')

const router = express.Router()

//get all results
router.get('/', getbreathingTestResult)

//post a new result
router.post('/', createBreathingTestResult)

//delete results
router.delete('/', deletebreathingTestResults)

module.exports = router