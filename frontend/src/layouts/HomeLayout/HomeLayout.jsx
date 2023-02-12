import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses, getUserProfile } from '@/actions/userAction';
import { getUserCart } from '@/actions/cartAction';

function DefaultLayout({ children }) {
    const { loading, userInfo, userToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userToken) {
            dispatch(getUserProfile())
                .unwrap()
                .then(async (res) => {
                    dispatch(getUserCart({ userId: res.user._id }));
                    dispatch(getUserAddresses(userToken));
                })
                .catch((error) => {
                    localStorage.setItem('isLoggedIn', false);
                });
        }
    }, [userToken]);
    return (
        <>
            <Header />
            <Outlet />
            <Footer contact />
        </>
    );
}

export default DefaultLayout;
