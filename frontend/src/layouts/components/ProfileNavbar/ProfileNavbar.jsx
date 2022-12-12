import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './ProfileNavbar.module.scss';
import assets from '@/assets';
import { PROFILE_NAV } from '@/constants';

const cx = classNames.bind(styles);

function ProfileNavbar(props) {
    const { userInfo } = useSelector((state) => state.user);

    return (
        <aside className={cx('profile-navbar')}>
            <div className={cx('account')}>
                <img
                    className={cx('avatar')}
                    src={userInfo?.avatar || assets.images.placeholderAvatar}
                    alt="Avatar user"
                />
                <div className={cx('info')}>
                    Tài khoản của <strong>{userInfo?.username}</strong>
                </div>
            </div>
            <ul className={cx('navbar')}>
                {PROFILE_NAV.map((nav, index) => (
                    <li key={index}>
                        <NavLink
                            className={({ isActive }) => (isActive ? cx('activeNav', 'nav-item') : cx('nav-item'))}
                            to={nav.to}
                        >
                            {nav.icon}
                            <span>{nav.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default ProfileNavbar;
