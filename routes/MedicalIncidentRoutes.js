const express=require('express')
const router=express.Router()
const {
    
    createTestMedicalIncident
}=require('../controllers/medicalIncidentController')

//post a new test
router.post('/', 
createTestMedicalIncident)

module.exports=router