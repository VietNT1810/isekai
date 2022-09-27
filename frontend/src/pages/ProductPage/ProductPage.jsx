import { Rating } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Add, AddShoppingCart, Remove } from '@mui/icons-material';

import assets from '@/assets';
import Button from '@/components/Button';
import { formatVND } from '@/helpers/number';
import * as productsService from '@/services/productsService';
import * as reviewsService from '@/services/reviewsService';
import styles from './ProductPage.module.scss';
import { formatTime } from '@/helpers/string';

const cx = classNames.bind(styles);

function ProductPage(props) {
    const params = useParams();
    const [product, setProducts] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            await productsService
                .getProduct(params.slug)
                .then((res) => {
                    setProducts(res.data.content[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        const fetchReviews = async () => {
            await reviewsService
                .getReviews(params.slug)
                .then((res) => {
                    console.log('review:', res.data.content);
                    setReviews(res.data.content);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchReviews();
        fetchProduct();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('product')}>
                    <div className={cx('product-image-container')}>
                        <div className={cx('product-image-box')}>
                            <img src={product.productImage} className={cx('product-image')} alt="Error image" />
                        </div>
                    </div>
                    <div className={cx('product-info')}>
                        <span className={cx('product-name')}>{product.name}</span>
                        <div className={cx('product-group')}>
                            <p className={cx('label')}>Đánh giá:</p>
                            <Rating
                                className={cx('rating')}
                                name="read-only"
                                value={product.averageRating || 0}
                                size="large"
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: '#04c4d9',
                                    },
                                }}
                                readOnly
                            />
                        </div>

                        <div className={cx('product-group')}>
                            <p className={cx('label')}>Giá:</p>
                            <span className={cx('price')}>{formatVND(product.price)}</span>
                        </div>

                        <div className={cx('product-group')}>
                            <p className={cx('label')}>Số lượng:</p>
                            <div className={cx('quantity')}>
                                <div className={cx('cart-quantity')}>
                                    <button>
                                        <Remove />
                                    </button>
                                    <input
                                        type="text"
                                        value="1"
                                        onChange={() => {
                                            console.log();
                                        }}
                                    />
                                    <button>
                                        <Add />
                                    </button>
                                </div>
                                <span>{product.quantity} sản phẩm có sẵn</span>
                            </div>
                        </div>

                        <div className={cx('product-group')}>
                            <p className={cx('label')}>Vận chuyển:</p>
                            <h1 className={cx('shipping')}>
                                <img src={assets.icons.iconShipping} alt="Error icon" />
                                <span>Miễn phí vận chuyển</span>
                            </h1>
                        </div>

                        <div className={cx('product-action')}>
                            <Button outline leftIcon={<AddShoppingCart color="primary" sx={{ fontSize: '24px' }} />}>
                                Thêm vào giỏ hàng
                            </Button>
                            <Button primary>Mua ngay</Button>
                        </div>
                    </div>
                </div>
                <div className={cx('review')}>
                    <div className={cx('title')}>NHẬN XÉT TỪ KHÁCH HÀNG</div>
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
            </div>
        </div>
    );
}

export default ProductPage;
