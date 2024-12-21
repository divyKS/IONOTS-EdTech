require('dotenv').config();
const express = require('express');
const connectDB = require('./db/index')
const cors = require('cors');
const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')
const assignedProjectRouter = require('./routes/assignedProject')

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', userRouter);

app.use('/api', projectRouter);

app.use('/api', assignedProjectRouter);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});