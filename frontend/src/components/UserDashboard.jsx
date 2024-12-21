import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const UserDashboard = () => {
    const { currentUser } = useUser();
    const [assignedProjects, setAssignedProjects] = useState([]);
    const [expandedProject, setExpandedProject] = useState(null);

    useEffect(() => {
        if (currentUser) {
            fetchAssignedProjects();
        }
    }, [currentUser]);

    const fetchAssignedProjects = async () => {
        const response = await axios.get(`http://localhost:3500/api/assigned-projects/student/${currentUser._id}`);
        setAssignedProjects(response.data);
    };

    const handleUpdateProgress = async (projectId, steps) => {
        await axios.put(`http://localhost:3500/api/assigned-projects/${projectId}`, {
            stepsCompleted: steps
        });
        fetchAssignedProjects();
    };

    const toggleProject = (projectId) => {
        if (expandedProject === projectId) {
            setExpandedProject(null);
        } else {
            setExpandedProject(projectId);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser?.name}</h2>
            
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">My Projects</h3>
                    {assignedProjects.length === 0 ? (
                        <p className="text-gray-500">No projects assigned yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {assignedProjects.map((project) => (
                                <div key={project._id} className="border rounded-lg p-4">
                                    <div 
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleProject(project._id)}
                                    >
                                        <div>
                                            <h4 className="text-lg font-medium">{project.projectId.title}</h4>
                                            <p className="text-gray-600">{project.projectId.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">
                                                Progress: {project.progress.toFixed(1)}%
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Score: {project.score.toFixed(1)}
                                            </div>
                                            <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                                                project.status === 'completed' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {project.status === 'completed' ? 'Completed' : 'In Progress'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {expandedProject === project._id && (
                                        <div className="mt-4 border-t pt-4">
                                            <h5 className="font-medium mb-2">Update Progress</h5>
                                            <div className="space-y-2">
                                                {[...Array(project.projectId.steps)].map((_, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`step-${project._id}-${index}`}
                                                            checked={index < project.stepsCompleted}
                                                            onChange={() => handleUpdateProgress(project._id, index + 1)}
                                                            className="form-checkbox h-4 w-4 text-blue-600"
                                                        />
                                                        <label
                                                            htmlFor={`step-${project._id}-${index}`}
                                                            className="ml-2 text-gray-700"
                                                        >
                                                            Step {index + 1}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;