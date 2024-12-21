import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Button from "./Button";

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
    const [name, setName] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:3500/api/users', {
        name,
        role: 'student'
      });
      setName('');
      onUserCreated();
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                Create Student
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
};

export default CreateUserModal;
