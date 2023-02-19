import { useMediaQuery } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserCart } from '@/actions/cartAction';
import { getUserAddresses, getUserProfile } from '@/actions/userAction';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileNavbar from '../components/ProfileNavbar';
import styles from './ProfileLayout.module.scss';

const cx = classNames.bind(styles);

function ProfileLayout(props) {
    const { loading, userInfo, userToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width: 768px)');

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
                        {!matches && <ProfileNavbar />}
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
