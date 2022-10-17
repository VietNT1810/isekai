import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Shop.module.scss';
import FilterSidebar from './components/FilterSidebar';
import ShopToolbar from './components/ShopToolbar';
import ProductList from './components/ProductList';
import * as productService from '@/services/productsService';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Shop(props) {
    const { filterQuery, sortOrder } = useSelector((state) => state.shop);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const params = {
                ...filterQuery,
                sortOrder,
            };
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
    }, [filterQuery, sortOrder]);

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
