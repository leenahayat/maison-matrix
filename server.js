global.crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
mongoose.connect(process.env.cloudMongoUrl)
    .then(() => console.log("Connected!"))
    .catch(err => console.log(err));

app.use('/api', inquiryRoutes);

const path = require('path');

app.use('/api', inquiryRoutes);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));