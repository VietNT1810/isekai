import React, { useState, useEffect, Suspense } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Shop.module.scss';
import FilterSidebar from './components/FilterSidebar';
import ShopToolbar from './components/ShopToolbar';
import * as productService from '@/services/productsService';
import { CircularProgress } from '@mui/material';
import ProductSkeleton from '@/components/ProductSkeleton/ProductSkeleton';

const cx = classNames.bind(styles);
const ProductList = React.lazy(() => import('./components/ProductList'));

function Shop(props) {
    const { filterQuery, sortOrder } = useSelector((state) => state.shop);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const params = {
                ...filterQuery,
                sortOrder,
            };
            await productService
                .getProducts(params)
                .then((res) => {
                    setProducts(res.data.content);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
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
                    {loading ? <ProductSkeleton /> : <ProductList products={products} />}
                </Suspense>
            </div>
        </>
    );
}

export default Shop;
