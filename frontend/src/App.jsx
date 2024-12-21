import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ProjectList from './components/ProjectList';
import ProjectProgress from './components/ProjectProgress';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/progress" element={<ProjectProgress />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;