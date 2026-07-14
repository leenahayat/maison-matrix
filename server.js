global.crypto = require('crypto');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();

const CLOUD_MONGO_URI = process.env.cloudMongoUrl;

mongoose.connect(CLOUD_MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => console.log("Database Connection Error:", err));

app.use('/api', inquiryRoutes);

app.use(express.static(__dirname)); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});