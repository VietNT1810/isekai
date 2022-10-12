import React from 'react';
import { Add, AddShoppingCartOutlined, Remove, RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Rating } from '@mui/material';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import styles from './ProductDetail.module.scss';
import assets from '@/assets';
import Button from '@/components/Button';
import { formatVND } from '@/helpers/number';
import { removeCart } from '@/pages/Cart/cartSlice';
import { removeUserCart } from '@/actions/cartAction';

const cx = classNames.bind(styles);

function ProductDetail({ product, isInCart }) {
    const dispatch = useDispatch();

    const handleRemoveCart = () => {
        dispatch(removeUserCart({ productId: product._id }))
            .unwrap()
            .then(() => {
                dispatch(removeCart(product._id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
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
                    {isInCart ? (
                        <Button
                            outline
                            leftIcon={<RemoveShoppingCartOutlined color="primary" sx={{ fontSize: '24px' }} />}
                            onClick={handleRemoveCart}
                        >
                            Xóa khỏi giỏ hàng
                        </Button>
                    ) : (
                        <Button
                            outline
                            leftIcon={<AddShoppingCartOutlined color="primary" sx={{ fontSize: '24px' }} />}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    )}
                    <Button primary>Mua ngay</Button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
