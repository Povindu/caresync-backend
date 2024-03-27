const express = require("express");

const {
  getDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
  addPatientAccess,
  verifyDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", getDoctors);

router.get("/:id", getDoctor);

router.delete("/:id", deleteDoctor);

router.patch("/:id", updateDoctor);

router.patch("/addPatientAccess/:id", addPatientAccess);

router.patch("/verifyDoctor/:id", verifyDoctor);

module.exports = router;
