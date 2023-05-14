import React from 'react';
import classNames from 'classnames/bind';

import styles from './ProductDetailSkeleton.module.scss';
import { Avatar, Skeleton } from '@mui/material';

const cx = classNames.bind(styles);

function ProductDetailSkeleton(props) {
    return (
        <div className={cx('product-detail-skeleton')}>
            <div className={cx('product')}>
                <div className={cx('image')}>
                    <div className={cx('image-container')}>
                        <Skeleton variant="rectangular" className={cx('image-skeleton')} />
                    </div>
                </div>
                <div className={cx('info')}>
                    <Skeleton variant="rounded" sx={{ fontSize: '3rem', maxWidth: '300px' }} />
                    <Skeleton variant="rounded" sx={{ fontSize: '3rem', maxWidth: '400px' }} />
                    <Skeleton variant="rounded" sx={{ fontSize: '3rem', maxWidth: '200px' }} />
                    <Skeleton variant="rounded" sx={{ fontSize: '3rem', maxWidth: '400px' }} />
                    <Skeleton variant="rounded" sx={{ fontSize: '3rem', maxWidth: '300px' }} />
                    <Skeleton variant="rounded" sx={{ fontSize: '6rem', maxWidth: '200px' }} />
                </div>
            </div>
            <div className={cx('description')}>
                <Skeleton variant="rounded" sx={{ fontSize: '3rem', maxWidth: '200px', margin: '12px 0' }} />
                <div className={cx('table')}>
                    <Skeleton variant="rounded" sx={{ fontSize: '3rem' }} />
                    <Skeleton variant="rounded" sx={{ fontSize: '3rem' }} />
                    <Skeleton variant="rounded" sx={{ fontSize: '3rem' }} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetailSkeleton;
