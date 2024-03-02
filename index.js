// app.js

// Import required modules

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./models/Patient");
require("./models/doctor");



const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/requireAuth");



// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount authentication routes
app.use(authRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');

});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB", err);
});

// Example route that requires authentication
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

// Start the Express server
const PORT = process.env.PORT || 3004; // Use the environment port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
