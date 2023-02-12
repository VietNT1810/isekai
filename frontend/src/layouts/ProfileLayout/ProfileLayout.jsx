import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ProfileLayout.module.scss';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileNavbar from '../components/ProfileNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses, getUserProfile } from '@/actions/userAction';
import { getUserCart } from '@/actions/cartAction';

const cx = classNames.bind(styles);

function ProfileLayout(props) {
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
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('profile-layout')}>
                        <ProfileNavbar />
                        <div className={cx('content')}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProfileLayout;
