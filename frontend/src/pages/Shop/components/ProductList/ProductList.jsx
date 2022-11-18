import React from 'react';
import classNames from 'classnames/bind';

import styles from './ProductList.module.scss';
import Grid from '@mui/material/Unstable_Grid2';
import { Star } from '@mui/icons-material';
import { formatVND } from '@/helpers/number';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductList({ products }) {
    return (
        <div className={cx('product-list')}>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid xs={12} sm={6} md={4} lg={4} xl={3} key={product._id}>
                        <NavLink to={`/product/${product.slug}`}>
                            <div className={cx('product-item')}>
                                <div className={cx('product-image-container')}>
                                    <div className={cx('product-image-box')}>
                                        <img
                                            src={product.productImage}
                                            alt="No image"
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
                                        <span>{product.averageRating}</span>
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
