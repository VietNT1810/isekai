import Footer from '@/layouts/components/Footer';
import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Checkout.module.scss';
import assets from '@/assets';
import { formatVND } from '@/helpers/number';

const cx = classNames.bind(styles);

function Checkout(props) {
    const { userInfo } = useSelector((state) => state.user);
    const { carts, userId, cartId } = useSelector((state) => state.cart);
    const userAddress = userInfo?.addresses?.[0];

    const getTotalPrice = () => {
        const totalPrice = carts.reduce((totalPrice, item) => totalPrice + item.productId.price * +item.quantity, 0);
        return totalPrice;
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <div className={cx('container')}>
                    <div className={cx('brand')}>
                        <Link to="/">
                            <img src={assets.images.logoWhite} alt="Error image" />
                        </Link>
                    </div>
                </div>
            </header>
            <main className={cx('checkout-content')}>
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <div className={cx('product')}>
                            <div className={cx('product-header')}>
                                <p className={cx('title', 'heading')}>Sản phẩm</p>
                                <div className={cx('title')}>Đơn giá</div>
                                <div className={cx('title')}>Số lượng</div>
                                <div className={cx('title', 'total')}>Thành tiền</div>
                            </div>
                            <div className={cx('product-info')}>
                                {carts.map((cart) => (
                                    <div key={cart.productId._id} className={cx('product-item')}>
                                        <div className={cx('info')}>
                                            <div className={cx('image-container')}>
                                                <div className={cx('image-box')}>
                                                    <img
                                                        src={cart.productId.productImage}
                                                        className={cx('image')}
                                                        alt="Error image"
                                                        width={30}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('name')}>
                                                <span>{cart.productId.name}</span>
                                            </div>
                                        </div>
                                        <div className={cx('block')}>{formatVND(cart.productId.price)}</div>
                                        <div className={cx('block')}>{cart.quantity}</div>
                                        <div className={cx('block', 'total')}>
                                            {formatVND(cart.productId.price * cart.quantity)}
                                        </div>
                                    </div>
                                ))}
                                <p className={cx('total-price')}>
                                    Tổng số tiền:
                                    <span className={cx('price')}>{formatVND(getTotalPrice())}</span>
                                </p>
                            </div>
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
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Checkout;
