import assets from '@/assets';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ShopLayout.module.scss';
import FilterSidebar from '../components/FilterSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
                <div className={cx('container')}>
                    <FilterSidebar />
                    <div className={cx('content')}>
                        <div className={cx('shop-toolbar')}>
                            <div className={cx('search-bar')}></div>
                            <div className={cx('sort-bar')}>
                                <div className={cx('title')}>Sort by</div>
                                <div className={cx('select-box')}>
                                    <select name="Newest" id="">
                                        <option value="1">Newest First</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ShopLayout;
