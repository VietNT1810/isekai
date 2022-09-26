import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Shop.module.scss';
import FilterSidebar from './components/FilterSidebar';
import ShopToolbar from './components/ShopToolbar';
import ProductList from './components/ProductList';
import * as productService from '@/services/productsService';

const cx = classNames.bind(styles);

function Shop(props) {
    const [products, setProducts] = useState([]);

    // for (const entry of searchParams.entries()) {
    //     console.log(entry);
    // }

    useEffect(() => {
        const fetchProducts = async () => {
            let query = {};
            await productService
                .getProducts({})
                .then((res) => {
                    setProducts(res.data.content);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchProducts();
    }, []);

    return (
        <>
            <FilterSidebar />
            <div className={cx('content')}>
                <ShopToolbar />
                <ProductList products={products} />
            </div>
        </>
    );
}

export default Shop;
