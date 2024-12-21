require('dotenv').config();
const express = require('express');
const connectDB = require('./db/index')
const cors = require('cors');
const User = require('./models/user')
const Project = require('./models/project')
const AssignedProject = require('./models/assignedProject')

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3500;

// User routes
app.get('/api/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Project routes
app.get('/api/projects', async (req, res) => {
  try {
      const projects = await Project.find();
      res.json(projects);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).json(project);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Assigned Project routes
app.get('/api/assigned-projects', async (req, res) => {
  try {
      const assignedProjects = await AssignedProject.find()
          .populate('studentId')
          .populate('projectId');
      res.json(assignedProjects);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/api/assigned-projects/student/:studentId', async (req, res) => {
  try {
      const assignedProjects = await AssignedProject.find({ studentId: req.params.studentId })
          .populate('projectId');
      res.json(assignedProjects);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/assigned-projects', async (req, res) => {
  try {
      const { studentId, projectId } = req.body;
      const existingAssignment = await AssignedProject.findOne({ studentId, projectId });
      
      if (existingAssignment) {
          return res.status(400).json({ message: 'Project already assigned to this student' });
      }

      const assignedProject = new AssignedProject({
          studentId,
          projectId,
          stepsCompleted: 0,
          progress: 0,
          score: 0
      });
      await assignedProject.save();
      res.status(201).json(assignedProject);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

app.put('/api/assigned-projects/:id', async (req, res) => {
  try {
      const { stepsCompleted } = req.body;
      const assignedProject = await AssignedProject.findById(req.params.id)
          .populate('projectId');
      
      const totalSteps = assignedProject.projectId.steps;
      const progress = (stepsCompleted / totalSteps) * 100;
      const score = progress; // Simple scoring based on progress
      const status = progress === 100 ? 'completed' : 'in_progress';

      const updatedProject = await AssignedProject.findByIdAndUpdate(
          req.params.id,
          {
              stepsCompleted,
              progress,
              score,
              status
          },
          { new: true }
      ).populate('projectId');

      res.json(updatedProject);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});