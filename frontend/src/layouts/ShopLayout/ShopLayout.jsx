import assets from '@/assets';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from './ShopLayout.module.scss';

const cx = classNames.bind(styles);

function ShopLayout({ children }) {
    const location = useLocation();
    const currentPath = location.pathname;

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
                <div className={cx('container')}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default ShopLayout;
