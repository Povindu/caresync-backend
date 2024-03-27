const express=require('express')
const router=express.Router()
const {
    
    createAppointmentMedicalIncident
}=require('../controllers/medicalIncidentAppointmentController')

//post a new test
router.post('/', 
createAppointmentMedicalIncident)

module.exports=router