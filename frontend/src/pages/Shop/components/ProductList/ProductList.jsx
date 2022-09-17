import React from 'react';
import classNames from 'classnames/bind';

import styles from './ProductList.module.scss';
import Grid from '@mui/material/Unstable_Grid2';
import { Star } from '@mui/icons-material';
import { formatVND } from '@/helpers/number';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const products = [
    {
        _id: '62fc93e245d2f2bd6c5475ae',
        name: 'product 1',
        fabric: 'Cotton',
        size: ['M', 'XL'],
        description: 'this is test product',
        detail: 'this test product normal ',
        rating: 4,
        price: 200000,
        discount: 12,
        quantity: 800,
        createdAt: '2022-08-17T07:08:18.070Z',
        updatedAt: '2022-08-19T04:50:24.279Z',
        __v: 0,
        productImage:
            'https://res.cloudinary.com/supafrankie/image/upload/v1660890497/clothes/TSM0658YYH_1_800x_x0yizs.png',
        productType: 'clothes',
    },
    {
        _id: '62fc950945d2f2bd6c5475b5',
        name: 'product 2',
        fabric: 'Cotton',
        size: ['M', 'XL'],
        description:
            'this is test product this is test product this is test product this is test product this is test product this is test product ',
        detail: 'this test product normal ',
        rating: 4,
        price: 200000,
        discount: 12,
        quantity: 800,
        createdAt: '2022-08-17T07:13:13.818Z',
        updatedAt: '2022-08-19T04:51:23.789Z',
        __v: 0,
        productImage: 'https://res.cloudinary.com/supafrankie/image/upload/v1661155551/wig/Ayaka_igj5qi.png',
        productType: 'wig',
    },
    {
        _id: '62fc972545d2f2bd6c5475b7',
        name: 'product 3',
        fabric: 'Cotton',
        size: ['M', 'XL'],
        description: 'this is test product',
        detail: 'this test product normal ',
        rating: 4,
        price: 200000,
        discount: 12,
        quantity: 800,
        createdAt: '2022-08-17T07:22:13.910Z',
        updatedAt: '2022-08-19T04:51:59.157Z',
        __v: 0,
        productImage: 'https://res.cloudinary.com/supafrankie/image/upload/v1660884344/cld-sample-2.jpg',
        productType: 'weapon',
    },
    {
        _id: '62ff1739944d5e5e1e8dfcb5',
        productImage:
            'https://res.cloudinary.com/supafrankie/image/upload/v1660890496/clothes/SHM02W9YYH_1_1800x1800_w07nyw.png',
        name: 'product 4',
        fabric: 'Cotton',
        size: ['M', 'XL'],
        description: 'this is test product',
        detail: 'this test product normal ',
        rating: 4,
        price: 200000,
        discount: 12,
        quantity: 800,
        createdAt: '2022-08-19T04:53:13.248Z',
        updatedAt: '2022-08-19T04:53:13.248Z',
        __v: 0,
        productType: 'clothes',
    },
];

function ProductList(props) {
    return (
        <div className={cx('product-list')}>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid xs={12} sm={6} lg={4} key={product._id}>
                        <NavLink to={`/product/${product._id}`}>
                            <div className={cx('product-item')}>
                                <div className={cx('product-image-container')}>
                                    <div className={cx('product-image-box')}>
                                        <img
                                            src={product.productImage}
                                            alt="No image"
                                            width="100"
                                            className={cx('product-image')}
                                        />
                                    </div>
                                </div>
                                <div className={cx('product-body')}>
                                    <h3 className={cx('product-name')}>{product.name}</h3>
                                    <p className={cx('product-description')}>{product.description}</p>
                                </div>
                                <div className={cx('product-footer')}>
                                    <div className={cx('price')}>{formatVND(product.price)}</div>
                                    <div className={cx('rating')}>
                                        <span>{product.rating}</span>
                                        <Star color="primary" />
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductList;
