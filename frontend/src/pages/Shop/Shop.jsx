import React, { useState, useEffect, Suspense } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Shop.module.scss';
import FilterSidebar from './components/FilterSidebar';
import ShopToolbar from './components/ShopToolbar';
import * as productService from '@/services/productsService';
import { CircularProgress } from '@mui/material';

const cx = classNames.bind(styles);
const ProductList = React.lazy(() => import('./components/ProductList'));

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
                <Suspense fallback={<CircularProgress sx={{ alignSelf: 'center', marginTop: '24px' }} />}>
                    <ProductList products={products} />
                </Suspense>
            </div>
        </>
    );
}

export default Shop;
