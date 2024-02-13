require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const DoctorRoutes = require('./routes/DoctorRoutes')
const BreathingTestRoutes = require('./routes/breathingTestRoutes')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



// routes
app.use('/api/doctors', DoctorRoutes)
app.use('/api/breathingTests', BreathingTestRoutes)



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



