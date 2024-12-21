const AssignedProject = require('../models/assignedProject')

const getAssignedProjects = async (req, res) => {
    try {
        const assignedProjects = await AssignedProject.find()
            .populate('studentId')
            .populate('projectId');
        res.json(assignedProjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectAssignedToThisStudent = async (req, res) => {
    try {
        const assignedProjects = await AssignedProject.find({ studentId: req.params.studentId })
            .populate('projectId');
        res.json(assignedProjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const assignProjectToStudent = async (req, res) => {
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
};

const updateProgress = async (req, res) => {
    try {
        const { stepsCompleted } = req.body;
        const assignedProject = await AssignedProject.findById(req.params.id)
            .populate('projectId');
        
        const totalSteps = assignedProject.projectId.steps;
        const progress = (stepsCompleted / totalSteps) * 100;
        const score = progress;
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
};

module.exports = { getAssignedProjects, getProjectAssignedToThisStudent, assignProjectToStudent, updateProgress }
