import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectProgress = () => {
  const [candidateProjects, setCandidateProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // In a real app, you'd filter by the logged-in candidate's ID
        const response = await axios.get('http://localhost:5000/api/projects/progress');
        setCandidateProjects(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const handleProgressUpdate = async (candidateProjectId, newProgress) => {
    try {
      await axios.put('http://localhost:5000/api/projects/progress', {
        candidateProjectId,
        progress: newProgress,
      });
      // Refresh progress data
      const response = await axios.get('http://localhost:5000/api/projects/progress');
      setCandidateProjects(response.data);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {candidateProjects.map(project => (
        <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{project.projectId.title}</h3>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 mt-1">
              Progress: {project.progress}%
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleProgressUpdate(project._id, Math.min(project.progress + 10, 100))}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update Progress
            </button>
            {project.score > 0 && (
              <span className="text-lg font-semibold">
                Score: {project.score}/100
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectProgress;