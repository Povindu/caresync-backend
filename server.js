const express = require("express");
const mongoose= require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const PatientRoutes = require('./ViewPatientsSummary/routes/Patients')
const uri = 'mongodb+srv://povinduchanmith:pass456789@cluster0.z3tqxz6.mongodb.net/?retryWrites=true&w=majority'



var corsOptions = {
  origin: "http://localhost:4000"
};
const DoctorRoutes = require('./routes/DoctorRoutes')
const authRoutes = require('./routes/authRoutes');
const requireAuth = require("./middleware/requireAuth")
// require('./models/UserNew');
// const trackRoutes = require('./routes/trackRoutes');
const BreathingTestRoutes = require('./routes/breathingTestRoutes')
const StepCounterTestRoutes = require('./routes/stepCountTestRoutes')



// express app
const app = express()

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
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



// routes
app.use('/api/doctors', DoctorRoutes)
app.use(authRoutes);

app.get('/', requireAuth, (req, res) => {
  res.send(`your email : ${req.user.email}`);
});


app.use('/api/breathingTests', BreathingTestRoutes)
app.use('/api/stepCounterTests', StepCounterTestRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db. Listening on port', process.env.PORT)
    })
  }) 
  .catch( (error)=>{
    console.log(error)
  })


