import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="min-h-screen bg-gray-100">
                    <Navbar />
                    <div className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/dashboard" element={<UserDashboard />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;