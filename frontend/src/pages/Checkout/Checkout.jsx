import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import assets from '@/assets';
import Button from '@/components/Button';
import { formatVND } from '@/helpers/number';
import Footer from '@/layouts/components/Footer';
import * as orderServices from '@/services/orderService';
import { initCart } from '../Cart/cartSlice';
import styles from './Checkout.module.scss';
import CheckoutProducts from './components/CheckoutProducts';
import PaymentMethod from './components/PaymentMethod';
import { getUserCart } from '@/actions/cartAction';
import { getUserAddresses, getUserProfile } from '@/actions/userAction';
import { openAlert } from '@/reducers/alertSlice';

const cx = classNames.bind(styles);

function Checkout(props) {
    const [method, setMethod] = useState({});
    const [loading, setLoading] = useState(false);
    const { userInfo, userToken } = useSelector((state) => state.user);
    const { carts, userId, cartId } = useSelector((state) => state.cart);
    const userAddress = userInfo?.addresses?.[0];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mobile = useMediaQuery('(max-width: 595px)');

    const getTotalPrice = () => {
        const totalPrice = carts.reduce((totalPrice, item) => totalPrice + item.productId.price * +item.quantity, 0);
        return totalPrice;
    };

    useEffect(() => {
        if (userToken) {
            dispatch(getUserProfile())
                .unwrap()
                .then((res) => {
                    dispatch(getUserCart({ userId: res.user._id }));
                    dispatch(getUserAddresses(userToken));
                })
                .catch((error) => {
                    localStorage.setItem('isLoggedIn', false);
                });
        }
    }, [userToken]);

    const handlePaymentMethod = (data) => {
        setMethod(data);
    };

    const handleCreateOrder = async () => {
        //alert when checkout without cart
        if (!carts.length > 0) {
            return dispatch(openAlert({ message: 'Giỏ hàng không có sản phẩm.', severity: 'error' }));
        }
        //navigate to user address page to create address
        if (!userAddress) {
            return navigate('/user/account/address');
        }
        //create order
        setLoading(true);
        const orderInfo = { method, cartId, addressId: userAddress?._id };
        await orderServices
            .createOrder(userToken, orderInfo)
            .then((res) => {
                setLoading(false);
                dispatch(initCart());
                dispatch(openAlert({ message: res.message }));
                navigate('/user/account/order');
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <div className={cx('container')}>
                    <div className={cx('brand')}>
                        <Link to="/">
                            <img src={assets.images.logoWhite} alt="Error image" />
                        </Link>
                        <span className={cx('divider')}></span>
                        <span className={cx('title')}>Thanh toán</span>
                    </div>
                </div>
            </header>
            <main className={cx('checkout-content')}>
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        {carts <= 0 && (
                            <div className={cx('empty-alert')}>
                                <div className={cx('alert-info')}>
                                    <ErrorOutline color="error" fontSize="large" />
                                    <span className={cx('alert-content')}>
                                        Giỏ hàng không có sản phẩm. Vui lòng thực hiện lại.
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className={cx('product')}>
                            <div className={cx('product-header')}>
                                <p className={cx('title', 'heading')}>Sản phẩm</p>
                                {!mobile && (
                                    <>
                                        <div className={cx('title')}>Đơn giá</div>
                                        <div className={cx('title')}>Số lượng</div>
                                        <div className={cx('title', 'total')}>Thành tiền</div>
                                    </>
                                )}
                            </div>
                            <div className={cx('product-info')}>
                                <CheckoutProducts carts={carts} />
                                <p className={cx('product-total')}>
                                    Tổng số tiền:
                                    <span className={cx('product-total__price')}>{formatVND(getTotalPrice())}</span>
                                </p>
                            </div>
                        </div>
                        <div className={cx('payment')}>
                            <p className={cx('heading')}>Phương thức thanh toán</p>
                            <PaymentMethod handleSelect={handlePaymentMethod} />
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('shipment-info')}>
                            <div className={cx('shipment-header')}>
                                <span className={cx('shipment-header__title')}>Giao tới</span>
                                <Link to="/user/account/address" className={cx('shipment-header__nav')}>
                                    Thay đổi
                                </Link>
                            </div>
                            {userAddress && (
                                <div className={cx('customer-info')}>
                                    <div className={cx('name')}>
                                        {/* Nguyen Tuan Viet | 0868402367 */}
                                        {userAddress.fullName} | {userAddress.telephone}
                                    </div>
                                    <div className={cx('address')}>
                                        {/* 37,ngõ 273, Nguyễn Khoái, Phường Thanh Lương, Quận Hai Bà Trưng, Hà Nội */}
                                        {userAddress.street}, {userAddress.ward}, {userAddress.district},{' '}
                                        {userAddress.city}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={cx('price')}>
                            <div className={cx('price-header')}>
                                <span className={cx('price-header__title')}>Đơn hàng</span>
                                <Link to="/cart" className={cx('price-header__nav')}>
                                    Thay đổi
                                </Link>
                            </div>
                            <div className={cx('price-summary')}>
                                <div className={cx('price-summary__item')}>
                                    <div className={cx('title')}>Tạm tính</div>
                                    <div className={cx('value')}>{formatVND(getTotalPrice())}</div>
                                </div>
                                <div className={cx('price-summary__item')}>
                                    <div className={cx('title')}>Phí vận chuyển</div>
                                    <div className={cx('value')}>{formatVND(0)}</div>
                                </div>
                            </div>
                            <div className={cx('price-total')}>
                                <div className={cx('price-text')}>Tổng tiền</div>
                                <div className={cx('price-content')}>
                                    <span className={cx('price-value')}>{formatVND(getTotalPrice())}</span>
                                    <span className={cx('price-noted')}>(Đã bao gồm VAT nếu có)</span>
                                </div>
                            </div>
                            <Button primary loading={loading} className={cx('btn')} onClick={handleCreateOrder}>
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Checkout;
