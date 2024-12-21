import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);
    const { setCurrentUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:3500/api/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (location.pathname === "/") {
          setCurrentUser(null);
        }
      }, [location.pathname]);

    const handleUserSelect = (user) => {
        setCurrentUser(user);
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
                <div
                    key={user._id} 
                    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleUserSelect(user)}
                >
                    <h3 className="text-xl font-semibold mb-2">
                        {user.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-sm ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.role}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Home;