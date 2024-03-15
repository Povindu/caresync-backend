const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


// var corsOptions = {
//   origin: "http://localhost:4000",
// };

// const requireAuth = require("./middleware/requireAuth");

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
