import { ShoppingCart, ShoppingCartTwoTone } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import assets from '@/assets';
import AvatarMenu from '@/components/AvatarMenu';
import { logoutUser } from '@/pages/Auth/userSlice';
import { getUserProfile } from '@/actions/userAction';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
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
        navigate('/login');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('brand')}>
                    <NavLink to="/">
                        <img src={assets.images.logoWhite} alt="Error image" />
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
                {userInfo ? (
                    <div className={cx('user-info')}>
                        <div className={cx('avatar')}>
                            <AvatarMenu
                                username="asd asd"
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
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/register">Đăng ký</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
