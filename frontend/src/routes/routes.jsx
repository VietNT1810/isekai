import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import DefaultLayout from '@/layouts/DefaultLayout';
import SpecialLayout from '@/layouts/SpecialLayout';
import ShopLayout from '@/layouts/ShopLayout/ShopLayout';
import AuthLayout from '@/layouts/AuthLayout';
import HomeLayout from '@/layouts/HomeLayout';

import Special from '@/pages/Special/Special';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import Profile from '@/pages/Profile';
import ChangePassword from '@/pages/ChangePassword';
import ProductPage from '@/pages/ProductPage';
import Cart from '@/pages/Cart';
import ResetPassword from '@/pages/ResetPassword';
import ProfileLayout from '@/layouts/ProfileLayout';
import Address from '@/pages/Address';

function Routes(props) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    let element = useRoutes([
        {
            path: '/',
            element: <HomeLayout />,
            children: [{ path: '', element: <Home /> }],
        },
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
                { path: 'special', element: <Special /> },
                { path: '/product/:slug', element: <ProductPage /> },
            ],
        },
        {
            path: '/',
            element: isLoggedIn == 'true' ? <Outlet /> : <Navigate to="/login" />,
            children: [
                {
                    path: '/',
                    element: <DefaultLayout />,
                    children: [{ path: 'cart', element: <Cart /> }],
                },
                {
                    path: 'user/account/',
                    element: <ProfileLayout />,
                    children: [
                        { path: '', element: <Navigate to="profile" /> },
                        { path: 'profile', element: <Profile /> },
                        { path: 'address', element: <Address /> },
                        { path: 'change-password', element: <ChangePassword /> },
                    ],
                },
            ],
        },
        {
            path: '/',
            element: <ShopLayout />,
            children: [
                { path: 'shop', element: <Shop /> },
                { path: 'weapon', element: <Shop /> },
                { path: 'wig', element: <Shop /> },
                { path: 'outfit', element: <Shop /> },
                { path: 'lolita', element: <Shop /> },
                { path: 'accessory', element: <Shop /> },
            ],
        },
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'login/identify', element: <ForgotPassword /> },
            ],
        },
        {
            path: 'reset-password/:token',
            element: <ResetPassword />,
        },
        {
            path: '*',
            element: <p>Nothing here :(</p>,
        },
    ]);

    return element;
}

export default Routes;
