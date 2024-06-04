const { response } = require("express");
const breathingTest = require("../../models/MedicalTestingModels/breathingTestModel.js");

// //get results
// const getbreathingTestResult = async (req, res) => {
//   const breathingResults = await breathingTest
//     .find({ pID: "212" })
//     .sort({ createdAt: -1 });
//   console.log("breathingResults", breathingResults);
//   res.status(200).json(breathingResults);
// };


//get a Patients results
const getPatientbreathingTestResult = async (req, res) => {

  const { id } = req.params;
  console.log("id", id);

  const breathingResults = await breathingTest
    .find({ pID: id })
    .sort({ createdAt: -1 });
  console.log("breathingResults", breathingResults);
  res.status(200).json(breathingResults);
};


//post result
const createBreathingTestResult = async (req, res) => {
  
  const { pID, date, systime, stopwatchTime } = req.body;
  console.log("req.body", req.body);
  //add doc to db
  try {
    const breathing = await breathingTest.create({
      pID,
      date,
      systime,
      stopwatchTime,
    });
    res.status(200).json(breathing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete results
const deletebreathingTestResults = async (req, res) => {
  const { id } = req.params;
  const deleteResults = await breathingTest.deleteMany({
    pID: id,
  });
  res.status(200).json(deleteResults);
};

//delete one
const deleteOneResult = (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);
  breathingTest
    .deleteOne({ _id: id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

module.exports = {
  getPatientbreathingTestResult,
  createBreathingTestResult,
  deleteOneResult,
  deletebreathingTestResults,
};
