import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Shop.module.scss';
import FilterSidebar from './components/FilterSidebar';
import ShopToolbar from './components/ShopToolbar';
import ProductList from './components/ProductList';
import * as productService from '@/services/productsService';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Shop(props) {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            const params = Object.fromEntries([...searchParams]);

            await productService
                .getProducts(params)
                .then((res) => {
                    setProducts(res.data.content);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchProducts();
    }, [searchParams]);

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
