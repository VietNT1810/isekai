import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function ProtectedRoute() {
    const { userInfo } = useSelector((state) => state.user);

    {
        userInfo ? <Outlet /> : <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
