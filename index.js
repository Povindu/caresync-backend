const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const requireAuth = require("./middleware/requireAuth")
require('./models/UserNew');


const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = "mongodb+srv://manushadananjaya999:manusha123@cluster0.dpyghhm.mongodb.net/your_database_name?retryWrites=true&w=majority"; // Replace 'your_database_name' with your actual database name
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB', err);
});

app.get('/',requireAuth, (req, res) => {
    res.send(`your email : ${req.user.email}`);
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
