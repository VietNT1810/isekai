import classNames from 'classnames/bind';
import React from 'react';

import styles from './ProductReviewSkeleton.module.scss';
import { Avatar, Skeleton } from '@mui/material';

const cx = classNames.bind(styles);

function ProductReviewSkeleton(props) {
    return (
        <div className={cx('product-review-skeleton')}>
            <div className={cx('title')}>Nhận Xét Từ Khách Hàng</div>
            <div className={cx('rating-summary')}>
                <Skeleton variant="rounded" sx={{ fontSize: '4rem', maxWidth: '200px' }} />
            </div>
            {[...Array(3)].map((e, index) => (
                <div key={index} className={cx('review-bar')}>
                    <div className={cx('user')}>
                        <div className={cx('avatar')}>
                            <Skeleton variant="circular" width={50} height={50}>
                                <Avatar />
                            </Skeleton>
                        </div>
                        <div className={cx('user-info')}>
                            <Skeleton variant="rounded" sx={{ maxWidth: '150px' }} />
                            <Skeleton variant="rounded" sx={{ maxWidth: '100px' }} />
                        </div>
                    </div>
                    <div className={cx('review')}>
                        <Skeleton variant="rounded" sx={{ maxWidth: '150px' }} />
                        <Skeleton variant="rounded" sx={{ maxWidth: '400px' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductReviewSkeleton;
