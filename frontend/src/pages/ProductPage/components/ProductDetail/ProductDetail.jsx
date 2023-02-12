import React, { useState } from 'react';
import { Add, AddShoppingCartOutlined, Remove, RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Alert, Rating, Snackbar } from '@mui/material';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ProductDetail.module.scss';
import assets from '@/assets';
import Button from '@/components/Button';
import { formatVND } from '@/helpers/number';
import { removeCart } from '@/pages/Cart/cartSlice';
import { addUserCart, getUserCart, removeUserCart } from '@/actions/cartAction';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductDetail({ product, isInCart }) {
    const { userInfo } = useSelector((state) => state.user);
    const { success, error } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [text, setText] = useState('');

    const handleQuantityChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            setQuantity(e.target.value);
        }
    };

    const handleQuantityBlur = (e) => {
        if (e.target.value == '') {
            setQuantity(1);
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantity > product.quantity) {
            return;
        }
        setQuantity((prev) => +prev + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => prev - 1);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleRemoveCart = () => {
        dispatch(removeUserCart({ productId: product._id }))
            .unwrap()
            .then(() => {
                setMessage('Xóa khỏi giỏ hàng thành công');
                setOpenAlert(true);
                dispatch(removeCart(product._id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddToCart = () => {
        if (!userInfo) {
            return navigate('/login', { state: { slug: product.slug } });
        }

        const cart = {
            userId: userInfo._id,
            productId: product._id,
            quantity: +quantity,
        };
        dispatch(addUserCart(cart))
            .unwrap()
            .then(() => {
                setMessage('Thêm vào giỏ hàng thành công');
                setOpenAlert(true);
                dispatch(getUserCart({ userId: userInfo._id }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={cx('product')}>
            <div className={cx('product-detail')}>
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

                    <div className={cx('product-group', 'product-quantity')}>
                        <p className={cx('label')}>Số lượng:</p>
                        <div className={cx('quantity')}>
                            <div className={cx('quantity-box')}>
                                <div className={cx('cart-quantity')}>
                                    <button onClick={handleDecreaseQuantity} disabled={quantity == 1}>
                                        <Remove />
                                    </button>
                                    <input
                                        type="tel"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        onBlur={handleQuantityBlur}
                                    />
                                    <button onClick={handleIncreaseQuantity}>
                                        <Add />
                                    </button>
                                </div>
                                <span>{product.quantity} sản phẩm có sẵn</span>
                            </div>
                            {quantity > product.quantity ? (
                                <div className={cx('quantity-error')}>
                                    <span>Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này</span>
                                </div>
                            ) : null}
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
                                onClick={handleAddToCart}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('product-description')}>
                <div className={cx('group')}>
                    <div className={cx('title')}>Thông Tin Chi Tiết</div>
                    <table className={cx('table')}>
                        <tbody>
                            {product?.specs?.map((spec, index) => (
                                <tr key={index}>
                                    <td>{spec.k}</td>
                                    <td>{spec.v}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={cx('group')}>
                    <div className={cx('title')}>Mô Tả Sản Phẩm</div>
                    <p className={cx('description')}>{product.description}</p>
                </div>
            </div>
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    variant="filled"
                    severity={success ? 'success' : 'error'}
                    sx={{ width: '400px', fontSize: '14px', fontFamily: 'SVN Gotham Regular', alignItems: 'center' }}
                >
                    {success ? message : error}
                </Alert>
            </Snackbar>
            <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => {
                    setText(e.target.value);
                }}
            ></textarea>
            <button
                onClick={() => {
                    const form = { text };
                    console.log(form);
                }}
            >
                submit
            </button>
        </div>
    );
}

export default ProductDetail;
