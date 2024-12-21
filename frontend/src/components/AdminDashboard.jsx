import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUserModal from './CreateUserModal';
import CreateProjectModal from './CreateProjectModal';
import Button from './Button';
import Modal from './Modal';
import ViewProjectModal from './ViewProjectModal';


const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
 
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
 
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  
 const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
 const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
 const [viewProjectsModalOpen, setViewProjectsModalOpen] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [usersRes, projectsRes, assignedProjectsRes] = await Promise.all([
      axios.get('http://localhost:3500/api/users'),
      axios.get('http://localhost:3500/api/projects'),
      axios.get('http://localhost:3500/api/assigned-projects')
    ]);

    const studentsWithProjects = usersRes.data
      .filter(user => user.role === 'student')
      .map(student => ({
        ...student,
        assignedProjects: assignedProjectsRes.data.filter(ap => 
          ap.studentId._id === student._id || ap.studentId === student._id
        )
      }));

    setStudents(studentsWithProjects);
    setProjects(projectsRes.data);
  };

  const getAvailableProjects = (studentId) => {
    if (!selectedStudent) {
      return [];
    }
    const student = students.find(s => s._id === studentId);
    const assignedProjectIds = student.assignedProjects?.map(ap => ap.projectId._id);
    return projects.filter(project => !assignedProjectIds?.includes(project._id));
  };

  const handleAssignProjects = async () => {
    const assignments = selectedProjectIds.map(project => ({
      studentId: selectedStudent,
      projectId: project
    }));

    for (let assignment of assignments) {
      await axios.post('http://localhost:3500/api/assigned-projects', assignment);
    }

    setIsAssignModalOpen(false);
    setSelectedProjectIds([]);
    setSelectedStudent(null);
    fetchData();
  };

  const handleCheckboxChange = (projectId) => {
    setSelectedProjectIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <div className="space-y-6 p-6">

<div className="flex gap-4">
        <Button 
          onClick={() => setIsCreateUserModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Create New Student
        </Button>
        <Button 
          onClick={() => setIsCreateProjectModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Create New Project
        </Button>

        <Button
        onClick={() => {
          setViewProjectsModalOpen(true);
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        View All Projects
      </Button>
      </div>


      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Students</h2>
        <div className="space-y-6">
          {students.map(student => (
            <div key={student._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">{student.name}</h3>
                <Button
                  onClick={() => {
                    setSelectedStudent(student._id);
                    setIsAssignModalOpen(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Assign New Projects
                </Button>
              </div>

              <div className="ml-4">
                <h4 className="font-medium mb-2">Assigned Projects:</h4>
                {student.assignedProjects.length === 0 ? (
                  <p className="text-gray-500">No projects assigned</p>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {student.assignedProjects.map(ap => (
                      <div key={ap._id} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {ap.projectId.title}
                          </span>
                          <span className={`px-2 py-1 rounded text-sm ${
                            ap.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {ap.status}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div>Progress: {ap.progress.toFixed(1)}%</div>
                          <div>Score: {ap.score.toFixed(1)}</div>
                          <div>Steps Completed: {ap.stepsCompleted} / {ap.projectId.steps}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>




      <Modal
  isOpen={isAssignModalOpen}
  onClose={() => {
    setIsAssignModalOpen(false);
    setSelectedProjectIds([]);
  }}
>
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-4">Assign Projects</h2>
    <div>
      {getAvailableProjects(selectedStudent).length === 0 ? (
        <p className="text-gray-600">No available projects to assign</p>
      ) : (
        <form className="space-y-3">
          {getAvailableProjects(selectedStudent).map((project) => (
            <div key={project._id} className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={project._id}
                  onChange={() => handleCheckboxChange(project._id)}
                  className="form-checkbox"
                />
                {project.title}
              </label>
            </div>
          ))}
        </form>
      )}
    </div>
    <div className="flex justify-end gap-3 mt-4">
      <Button
        onClick={() => {
          setIsAssignModalOpen(false);
          setSelectedProjectIds([]);
        }}
        className="bg-gray-500 hover:bg-gray-600 text-white"
      >
        Cancel
      </Button>
      <Button
        onClick={handleAssignProjects}
        disabled={selectedProjectIds.length === 0}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Confirm Assignment
      </Button>
    </div>
  </div>
</Modal>

<CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        onUserCreated={fetchData}
      />

      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onProjectCreated={fetchData}
      />
     
      <ViewProjectModal
        isOpen={viewProjectsModalOpen}
        onClose={() => (setViewProjectsModalOpen(false))}
        projects={projects}
      />

      
     
    </div>
  );
};

export default AdminDashboard;