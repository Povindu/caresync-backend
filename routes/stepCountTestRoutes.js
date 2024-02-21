const express = require('express')
const {
   getStepCounterTestResult,
   createStepCountResult,
   deleteStepCounterTestResult 
}= require('../controllers/stepCountController')

const router = express.Router()

//get all results
router.get('/', getStepCounterTestResult)

//post a new result
router.post('/', createStepCountResult)

//delete results
router.delete('/', deleteStepCounterTestResult)

module.exports = router