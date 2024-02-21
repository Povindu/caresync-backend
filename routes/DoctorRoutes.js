const express = require("express");

const {
  getDoctor,
  getDoctors,
  createDoctor,
  deleteDoctor,
  updateDoctor,
  addPatientAccess,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", getDoctors);

router.get("/:id", getDoctor);

router.post("/", createDoctor);

router.delete("/:id", deleteDoctor);

router.patch("/:id", updateDoctor);

router.patch("/access/:id", addPatientAccess);

module.exports = router;
