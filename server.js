const express = require("express");
const mongoose= require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const PatientRoutes = require('./routes/Patients')
const uri = 'mongodb+srv://povinduchanmith:pass456789@cluster0.z3tqxz6.mongodb.net/?retryWrites=true&w=majority'


const app = express();

var corsOptions = {
  origin: "http://localhost:3007"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// app.get("/patients", PatientRoutes, (req, res) => {
//   res.json({ message: "Welcome to caresync application." });
// });

app.use("/patients", PatientRoutes);





// app.use('/patients',PatientRoutes)


// app.get('/patients', PatientRoutes,  async (req, res) => {
//   try {
//     const db = getDB();
//     const patients = await db.collection('patients').find({}).toArray();
//     res.json(patients);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// set port, listen for requests
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./models/index");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

 