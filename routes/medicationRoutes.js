const express = require("express");
const router = express.Router();
const Medication = require("../models/Medications");
const Patient = require("../models/PatientsModel");
const Medications = require("../models/Medications");

// Route to fetch medication data for a specific patient
router.post("/", async (req, res) => {
  const medication = await Medication.find({}).sort({ createdAt: -1 });
  console.log(medication);
  res.status(200).json(medication);
});

// Route to add medication
router.post("/add", async (req, res) => {
  try {
    const { patientId, selectedDate, medicalDetails, doctor } = req.body;

    // Fetch patient details from the database using patientId
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Create a new medication instance using the fetched patient ID, selected date, and medical details
    const newMedication = new Medication({
      patient: patient._id, // Use patient's ObjectId
      selectedDate: new Date(selectedDate), // Assuming selectedDate is a string in ISO format
      medicalDetails: medicalDetails,
      doctor: doctor,
    });

    // Save the medication
    await newMedication.save();

    res.status(200).json({ message: "Medication saved successfully" });
    S;
  } catch (error) {
    console.error("Error saving medication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const { selectedDate, medicalDetails } = req.body;
    console.log(selectedDate, medicalDetails);
    // const formatDate = (selectedDate) => {
    //   if (!selectedDate) {
    //     return "Invalid Date";
    //   }

    //   const date = new Date(selectedDate);

    //   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //   const months = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ];

    //   const day = days[date.getDay()];
    //   const month = months[date.getMonth()];
    //   const dayOfMonth = date.getDate();
    //   const year = date.getFullYear();
    //   const hours = ("0" + date.getHours()).slice(-2);
    //   const minutes = ("0" + date.getMinutes()).slice(-2);
    //   const seconds = ("0" + date.getSeconds()).slice(-2);
    //   const timeZone = date.toString().match(/\(([^)]+)\)$/)[1];

    //   return `${day} ${month} ${dayOfMonth} ${year} ${hours}:${minutes}:${seconds} GMT${
    //     date.getTimezoneOffset() > 0 ? "-" : "+"
    //   }${Math.abs(date.getTimezoneOffset() / 60)
    //     .toString()
    //     .padStart(2, "0")}${Math.abs(date.getTimezoneOffset() % 60)
    //     .toString()
    //     .padStart(2, "0")} (${timeZone})`;
    // };

    // const formattedDate = formatDate(selectedDate);
    // console.log(formattedDate);

    // console.log("Request parameters:", req.body); // Log received parameters

    // Find the medication by patientId, selectedDate, and medicalDetails
    const medication = await Medications.findOneAndDelete({
      selectedDate,
      medicalDetails,
    });

    console.log(medication);

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.status(200).json({ message: "Medication deleted successfully" });
  } catch (error) {
    console.error("Error deleting medication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
