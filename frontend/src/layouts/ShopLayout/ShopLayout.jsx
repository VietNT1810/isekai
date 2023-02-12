import assets from '@/assets';
import classNames from 'classnames/bind';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from './ShopLayout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserAddresses, getUserProfile } from '@/actions/userAction';
import { getUserCart } from '@/actions/cartAction';

const cx = classNames.bind(styles);

function ShopLayout({ children }) {
    const location = useLocation();
    const currentPath = location.pathname;
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

    const getBanner = () => {
        const bannerByRoute = {
            '/shop': assets.images.shopBanner,
            '/weapon': assets.images.weaponBanner,
            '/wig': assets.images.wigBanner,
            '/outfit': assets.images.outfitBanner,
            '/lolita': assets.images.lolitaBanner,
            '/accessory': assets.images.accessoryBanner,
        };
        return bannerByRoute[currentPath] || '';
    };

    return (
        <>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('banner')}>
                    <img src={getBanner()} alt="Error image" />
                </div>
                <div className={cx('container')}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ShopLayout;
