import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function ProtectedRoute() {
    const { userInfo, loading } = useSelector((state) => state.user);
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return <>{!isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default ProtectedRoute;
