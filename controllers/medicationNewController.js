const { response } = require("express");
const addMedication = require("../models/medicationNewModel");

//get results
const getMedicationforms = async (req, res) => {
  const addmedications = await addMedication.find({}).sort({ createdAt: -1 });
  res.status(200).json(addmedications);
};

//post result
const postMedicationForm = async (req, res) => {
  const { by, medicine, date, pills, days, dayArray, times, baw, description } =
    req.body;

  //add doc to db
  try {
    const addmedications = await addMedication.create({
      by,
      medicine,
      date,
      pills,
      days,
      dayArray,
      times,
      baw,
      description,
    });
    res.status(200).json(addmedications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete one
const deleteOneMedication = (req, res, next) => {
  const { id } = req.params;
  addMedication
    .deleteOne({ _id: id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//get results for a specific day
const getMedicationforDay = async (req, res) => {
  const { date } = req.params;
  addMedication
    .find({ dayArray: date })
    .sort({ createdAt: -1 })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//update medication
const updateMedication = async (req, res, next) => {
  const { id } = req.params;
  const { medicine, date, pills, days, dayArray, times, baw, description } =
    req.body;
  addMedication
    .updateOne(
      { _id: id },
      {
        $set: {
          medicine: medicine,
          date: date,
          pills: pills,
          days: days,
          dayArray: dayArray,
          times: times,
          baw: baw,
          description: description,
        },
      }
    )
    .then((response) => {
      console.log(id);
      res.json({ response });
    })
    .then((data) => console.log(data))
    .catch((error) => {
      res.json({ error });
    });
};

module.exports = {
  getMedicationforms,
  postMedicationForm,
  deleteOneMedication,
  getMedicationforDay,
  updateMedication,
};
