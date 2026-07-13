global.crypto = require('crypto');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

require('dotenv').config();

const CLOUD_MONGO_URI = process.env.cloudMongoUrl;

mongoose.connect(CLOUD_MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => console.log("Database Connection Error:", err));



// Mount the CRUD API Route
app.use('/api', inquiryRoutes);


app.listen(PORT, () => {
    console.log(`Maison Matrix Server running perfectly on port ${PORT}`);
});