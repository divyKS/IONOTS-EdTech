import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { currentUser, setCurrentUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null);
        navigate('/');
    };

    return (
        <nav className="bg-blue-500 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-32">
                    <div className="flex items-center ">
                        <Link to="/" className="text-xl font-bold text-4xl text-white" onClick={handleLogout}>
                            IONOTS Technologies - EdTech Platform
                        </Link>
                    </div>
                    
                    {currentUser && (
                        <div className="flex items-center space-x-4">
                            <span className="text-white">
                                {currentUser.name} ({currentUser.role})
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;