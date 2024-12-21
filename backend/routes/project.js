const express = require('express');
const { createProject, getProjects } = require('../controllers/project');
const router = express.Router();

router.post('/projects', createProject);

router.get('/projects', getProjects);

module.exports = router;