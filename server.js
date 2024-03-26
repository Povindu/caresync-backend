
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const DoctorRoutes = require('./routes/DoctorRoutes')
const authRoutes = require('./routes/authRoutes');
const requireAuth = require("./middleware/requireAuth")
// require('./models/UserNew');
// const trackRoutes = require('./routes/trackRoutes');
const BreathingTestRoutes = require('./routes/breathingTestRoutes')
const StepCounterTestRoutes = require('./routes/stepCountTestRoutes')
const MedicalIncidentRoutes=require('./routes/MedicalIncidentRoutes')

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const Auth = require("./middleware/AuthMiddleware");
const AdminAuth = require("./middleware/AdminAuthMiddleware.js");

// var corsOptions = {
//   origin: "http://localhost:4000",
// };

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
const RoutesIndex = require("./routes/routesIndex");
app.use("/api", RoutesIndex);


app.use('/api/breathingTests', BreathingTestRoutes)
app.use('/api/stepCounterTests', StepCounterTestRoutes)
app.use('/api/medicalIncident',MedicalIncidentRoutes)


//Test API
// app.use("/api", Auth,  RoutesIndex);
// app.use("/api/admin", AdminAuth,  RoutesIndex);


//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

// Test Routes

// app.get("/AuthTest", requireAuth, (req, res) => {
//   res.send(`your email : ${req.user.email}`);
// });

app.get("/", (req, res) => {
  res.send({ msg: "CareSync Test Endpoint v1" });
});
