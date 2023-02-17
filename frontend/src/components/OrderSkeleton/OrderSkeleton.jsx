import { Skeleton } from '@mui/material';
import classNames from 'classnames/bind';
import React from 'react';

import styles from './OrderSkeleton.module.scss';

const cx = classNames.bind(styles);

function OrderSkeleton(props) {
    return (
        <div className={cx('order-skeleton')}>
            <Skeleton variant="rounded" sx={{ fontSize: '2rem', marginBottom: '12px' }} />
            <div className={cx('middle')}>
                <div className={cx('left')}>
                    <Skeleton variant="rounded" width={80} height={80} />
                </div>
                <div className={cx('right')}>
                    <Skeleton variant="rounded" sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="rounded" sx={{ fontSize: '2rem' }} width={300} />
                </div>
            </div>
            <div className={cx('bottom')}>
                <Skeleton variant="rounded" sx={{ fontSize: '2rem' }} width={80} height={40} />
                <Skeleton variant="rounded" sx={{ fontSize: '2rem' }} width={80} height={40} />
            </div>
        </div>
    );
}

export default OrderSkeleton;
