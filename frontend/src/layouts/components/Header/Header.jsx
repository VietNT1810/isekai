import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header(props) {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('brand')}>
                    <NavLink to="/">
                        <img src={images.logoWhite} alt="Error image" />
                    </NavLink>
                </div>
                <div className={cx('nav')}>
                    <NavLink className={({ isActive }) => (isActive ? cx('activeNav') : '')} to="/">
                        Trang chủ
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? cx('activeNav') : '')} to="/shop">
                        Cửa hàng
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? cx('activeNav') : '')} to="/special">
                        Đặc biệt
                    </NavLink>
                </div>
                <div className={cx('actions')}>
                    <Link to="/login">Đăng nhập</Link>
                    <Link to="/register">Đăng ký</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
