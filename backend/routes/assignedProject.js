const express = require('express');
const { getAssignedProjects, getProjectAssignedToThisStudent, assignProjectToStudent, updateProgress } = require('../controllers/assignedProject');
const router = express.Router();

router.post('/assigned-projects', assignProjectToStudent);

router.put('/assigned-projects/:id', updateProgress);

router.get('/assigned-projects',  getAssignedProjects);

router.get('/assigned-projects/student/:studentId', getProjectAssignedToThisStudent);

module.exports = router;