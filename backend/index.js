require('dotenv').config();
const express = require('express');
const connectDB = require('./db/index')
const cors = require('cors');
const projectSchema = require('./models/project');
const candidateProjectSchema = require('./models/candidateProject');
const candidateSchema = require('./models/candidate');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3500;

// Candidate Routes
app.post('/api/candidates', async (req, res) => {
  try {
    const candidate = new candidateSchema(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await candidateSchema.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/candidates/:id', async (req, res) => {
  try {
    const candidate = await candidateSchema.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectSchema.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign project to candidate
app.post('/api/projects/assign', async (req, res) => {
  try {
    const { candidateId, projectId } = req.body;
    
    const candidate = await candidateSchema.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const candidateProject = new candidateProjectSchema({
      candidateId,
      projectId
    });
    await candidateProject.save();
    await projectSchema.findByIdAndUpdate(projectId, { status: 'assigned' });
    res.status(201).json(candidateProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get candidate's projects
app.get('/api/candidates/:candidateId/projects', async (req, res) => {
  try {
    const candidateProjects = await candidateProjectSchema.find({ candidateId: req.params.candidateId })
      .populate('projectId')
      .exec();
    res.json(candidateProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update project progress
app.put('/api/projects/progress', async (req, res) => {
  try {
    const { candidateProjectId, progress, score } = req.body;
    const updatedProject = await candidateProjectSchema.findByIdAndUpdate(
      candidateProjectId,
      { progress, score },
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});