import classNames from 'classnames/bind';
import React from 'react';

import styles from './ProductSkeleton.module.scss';
import { Grid, Skeleton } from '@mui/material';

const cx = classNames.bind(styles);

function ProductSkeleton(props) {
    return (
        <div className={cx('product-skeleton')}>
            <Grid container spacing={2} sx={{ marginLeft: '-8px' }}>
                {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={skeleton} sx={{ padding: '8px !important' }}>
                        <Skeleton variant="rounded" sx={{ fontSize: '2rem' }} height={300} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductSkeleton;
