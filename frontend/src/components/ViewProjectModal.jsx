import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

const ViewProjectModal = ({ isOpen, onClose, projects }) => {
  
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <div className="border rounded p-4 max-h-64 overflow-y-auto bg-gray-50">
            {projects.length === 0 ? (
              <p>No projects available</p>
            ) : (
              <ul className="space-y-2">
                {projects.map((project) => (
                  <li key={project._id} className="border-b p-2">
                    <strong>{project.title}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    );
};

export default ViewProjectModal;
