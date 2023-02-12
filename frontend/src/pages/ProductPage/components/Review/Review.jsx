import React from 'react';
import classNames from 'classnames/bind';

import styles from './Review.module.scss';
import { Rating } from '@mui/material';
import { formatTime } from '@/helpers/string';

const cx = classNames.bind(styles);

function Review({ product, reviews }) {
    return (
        <div className={cx('review')}>
            <div className={cx('title')}>Nhận Xét Từ Khách Hàng</div>
            <div className={cx('rating-summary')}>
                <span className={cx('rating-point')}>{product.averageRating}</span>
                <div className={cx('rating-star')}>
                    <Rating
                        className={cx('rating-star_icon')}
                        value={product.averageRating || 0}
                        size="large"
                        sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#04c4d9',
                            },
                        }}
                        readOnly
                    />
                    <span className={cx('rating-total')}>{product.totalReviews} nhận xét</span>
                </div>
            </div>
            {reviews.map((review) => (
                <div className={cx('review-bar')} key={review._id}>
                    <div className={cx('user')}>
                        <div className={cx('user-avatar')}>
                            <img src={review.user.avatar} alt="" />
                        </div>
                        <div className={cx('user-info')}>
                            <div className={cx('name')}>{review.user.username}</div>
                            <div className={cx('time-create')}>{formatTime(review.createdAt)}</div>
                        </div>
                    </div>
                    <div className={cx('review-info')}>
                        <Rating
                            className={cx('rating')}
                            value={review.rating || 0}
                            size="large"
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#04c4d9',
                                },
                            }}
                            readOnly
                        />
                        <div className={cx('comment')}>{review.review}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Review;
