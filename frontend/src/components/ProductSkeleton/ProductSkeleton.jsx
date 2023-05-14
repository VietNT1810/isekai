import classNames from 'classnames/bind';
import React from 'react';

import styles from './ProductSkeleton.module.scss';
import { Grid, Skeleton } from '@mui/material';

const cx = classNames.bind(styles);

function ProductSkeleton(props) {
    return (
        <div className={cx('product-skeleton')}>
            <Grid container spacing={2} sx={{ marginLeft: '-8px' }}>
                {[...Array(8)].map((e, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index} sx={{ padding: '8px !important' }}>
                        <Skeleton variant="rounded" sx={{ fontSize: '2rem' }} height={400} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductSkeleton;
