const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

require("./models/doctor");
require("./models/Patient");

// var corsOptions = {
//   origin: "http://localhost:4000",
// };

const DoctorRoutes = require("./routes/DoctorRoutes");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/requireAuth");
// require('./models/UserNew');
// const trackRoutes = require('./routes/trackRoutes');
const BreathingTestRoutes = require("./routes/breathingTestRoutes");
const StepCounterTestRoutes = require("./routes/stepCountTestRoutes");
const PatientRoutes = require("./routes/Patients");

const MedicationRoutes = require("./routes/medicationRoutes");

// express app
const app = express();

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use(authRoutes);
app.use("/api/doctors", DoctorRoutes);
app.use("/api/breathingTests", BreathingTestRoutes);
app.use("/api/stepCounterTests", StepCounterTestRoutes);
app.use("/patients", PatientRoutes);

app.use("/medications", MedicationRoutes);

app.get("/AuthTest", requireAuth, (req, res) => {
  res.send(`your email : ${req.user.email}`);
});

app.get("/", (req, res) => {
  res.send({ msg: "CareSync Test Endpoint v1" });
});

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });
