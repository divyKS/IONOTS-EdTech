import React from 'react';
import { Navigate } from 'react-router';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ roleRequired, children }) => {
    const { currentUser } = useUser();

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    if (roleRequired && currentUser.role !== roleRequired) {
        return currentUser.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
