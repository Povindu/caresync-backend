const express=require('express')
const router=express.Router()
const {
    
    createSymptomMedicalIncident
}=require('../controllers/medicalIncidentSymptomController')

//post a new test
router.post('/', 
createSymptomMedicalIncident)

module.exports=router