require('dotenv').config();
const express = require('express');
const connectDB = require('./db/index')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3500;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});