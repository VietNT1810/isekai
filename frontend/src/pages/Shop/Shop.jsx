import React from 'react';
import classNames from 'classnames/bind';

import styles from './Shop.module.scss';
import FilterSidebar from './components/FilterSidebar';
import ShopToolbar from './components/ShopToolbar';
import ProductList from './components/ProductList';

const cx = classNames.bind(styles);

function Shop(props) {
    return (
        <>
            <FilterSidebar />
            <div className={cx('content')}>
                <ShopToolbar />
                <ProductList />
            </div>
        </>
    );
}

export default Shop;
