import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleAcceptProject = async (projectId) => {
    try {
      await axios.post('http://localhost:5000/api/projects/assign', {
        candidateId: '12345', // This would come from auth context in a real app
        projectId
      });
      // Refresh projects list
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error accepting project:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </span>
            {project.status === 'available' && (
              <button
                onClick={() => handleAcceptProject(project._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Accept Project
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;