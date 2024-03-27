const express=require('express')
const router=express.Router()
const {
    
    createMedicationMedicalIncident
}=require('../controllers/medicalIncidentMedicationController')

//post a new test
router.post('/', 
createMedicationMedicalIncident)

module.exports=router