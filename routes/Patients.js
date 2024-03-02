const express = require("express");
const {
  getPatients,
  getPatient,
} = require("../controllers/PatientController");

const router = express.Router();

router.get("/", getPatients);

// router.get('/',(res,req)=>{
//     res.json({mssg:'get all patients'})
// })

router.get("/patientId", getPatient);

module.exports = router;
