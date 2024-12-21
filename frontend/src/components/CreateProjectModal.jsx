import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Button from "./Button";

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
    const [project, setProject] = useState({
      title: '',
      description: '',
      steps: ''
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:3500/api/projects', project);
      setProject({ title: '', description: '', steps: '' });
      onProjectCreated();
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => setProject({...project, title: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) => setProject({...project, description: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Steps
              </label>
              <input
                type="number"
                value={project.steps}
                onChange={(e) => setProject({...project, steps: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Create Project
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
};

export default CreateProjectModal;