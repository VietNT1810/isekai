import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ProfileLayout.module.scss';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileNavbar from '../components/ProfileNavbar';

const cx = classNames.bind(styles);

function ProfileLayout(props) {
    return (
        <>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('profile-layout')}>
                        <ProfileNavbar />
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProfileLayout;
