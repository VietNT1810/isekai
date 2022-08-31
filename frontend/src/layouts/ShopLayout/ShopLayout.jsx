import assets from '@/assets';
import { useLocation } from 'react-router-dom';

import FilterSidebar from '../components/FilterSidebar';
import Header from '../components/Header';

function ShopLayout({ children, banner }) {
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
            {console.log(currentPath)}
            <Header />
            <div className="banner">
                <img src={getBanner()} alt="Error image" />
            </div>
            <div className="container">
                <FilterSidebar />
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default ShopLayout;
