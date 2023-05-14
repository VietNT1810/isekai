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
                <div className={cx('title')}>Thông tin sản phẩm</div>
                {[...Array(3)].map((e, index) => (
                    <div key={index} className={cx('table')}>
                        <div className={cx('col-left')}>
                            <Skeleton variant="rounded" sx={{ fontSize: '3rem' }} />
                        </div>
                        <div className={cx('col-right')}>
                            <Skeleton variant="rounded" sx={{ fontSize: '3rem' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductDetailSkeleton;
