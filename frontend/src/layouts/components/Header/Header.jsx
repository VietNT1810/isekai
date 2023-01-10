import { useState } from 'react';
import { MenuRounded, ShoppingCartTwoTone } from '@mui/icons-material';
import { Avatar, Badge, IconButton, useMediaQuery } from '@mui/material';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import assets from '@/assets';
import AvatarMenu from '@/components/AvatarMenu';
import { logoutUser } from '@/pages/Auth/userSlice';
import { initCart } from '@/pages/Cart/cartSlice';

const cx = classNames.bind(styles);

function Header() {
    const matches = useMediaQuery('(max-width: 768px)');
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const { loading, userInfo } = useSelector((state) => state.user);
    const { carts } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickProfile = () => {
        console.log('click profile');
        navigate('/user/account/profile');
    };

    const handleClickLogout = () => {
        console.log('click logout');
        dispatch(logoutUser());
        dispatch(initCart());
        navigate('/login');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('hamburger')}>
                    <IconButton
                        edge="start"
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                        }}
                    >
                        <MenuRounded className={cx('hamburger-icon')} />
                    </IconButton>
                </div>
                <div className={cx('brand')}>
                    <NavLink to="/">
                        <img src={assets.images.logoWhite} alt="Error image" />
                    </NavLink>
                </div>
                <div className={cx('nav', { expanded: isNavExpanded })}>
                    <NavLink
                        className={({ isActive }) => (isActive ? cx('activeNav', 'nav-item') : cx('nav-item'))}
                        to="/"
                    >
                        Trang chủ
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => (isActive ? cx('activeNav', 'nav-item') : cx('nav-item'))}
                        to="/shop"
                    >
                        Cửa hàng
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => (isActive ? cx('activeNav', 'nav-item') : cx('nav-item'))}
                        to="/special"
                    >
                        Đặc biệt
                    </NavLink>
                </div>
                {userInfo ? (
                    <div className={cx('user-info')}>
                        <div className={cx('avatar')}>
                            <AvatarMenu
                                username={userInfo?.username}
                                userAvatar={userInfo ? userInfo?.avatar : null}
                                onClickProfile={handleClickProfile}
                                onClickLogout={handleClickLogout}
                            />
                            <IconButton aria-label="cart" onClick={handleCartClick}>
                                <Badge badgeContent={carts.length} color="secondary">
                                    <ShoppingCartTwoTone sx={{ fontSize: '24px', color: '#1f1f26' }} />
                                </Badge>
                            </IconButton>
                        </div>
                    </div>
                ) : (
                    <div className={cx('actions')}>
                        {matches ? (
                            <IconButton
                                aria-label="delete"
                                size="large"
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                <Avatar src="/broken-image.jpg" />
                            </IconButton>
                        ) : (
                            <div className={cx('actions')}>
                                <Link to="/login">Đăng nhập</Link>
                                <Link to="/register">Đăng ký</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
