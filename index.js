// app.js

// Import required modules
require("./models/Patient");
require("./models/Doctor");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/requireAuth");

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount authentication routes
app.use(authRoutes);

// Mount track routes


// MongoDB connection URI
const mongoUri = "mongodb+srv://manushadananjaya999:manusha123@cluster0.dpyghhm.mongodb.net/your_database_name?retryWrites=true&w=majority";

// Check if MongoDB URI is provided
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied. Make sure you watch the video on setting up MongoDB!`
  );
}

// Connect to MongoDB
mongoose.set("strictQuery", true); // resolves future deprecation issue with Mongoose v7
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB instance");
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
