import React from 'react';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import CartList from './components/CartList';
import { formatVND } from '@/helpers/number';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function Cart(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>Giỏ hàng của bạn</h2>
                    <small>Hiện tại đang có 1 sản phẩm</small>
                </div>
                <div className={cx('cart-content')}>
                    <div className={cx('left')}>
                        <div className={cx('cart-heading')}>
                            <span>Sản phẩm</span>
                            <span>Đơn giá</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                            <span>Xóa</span>
                        </div>
                        <CartList />
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('shipment-info')}>
                            <div className={cx('shipment-title')}>Giao tới</div>
                            <div className={cx('customer-info')}>
                                <div className={cx('name')}>Nguyen Tuan Viet</div>
                                <div className={cx('address')}>
                                    37,ngõ 273, Nguyễn Khoái, Phường Thanh Lương, Quận Hai Bà Trưng, Hà Nội
                                </div>
                            </div>
                        </div>
                        <div className={cx('price-summary')}>
                            <div className={cx('price-total')}>
                                <div className={cx('price-text')}>Tổng tiền</div>
                                <div className={cx('price-content')}>
                                    <span className={cx('price-value')}>{formatVND(200000)}</span>
                                    <span className={cx('price-noted')}>(Đã bao gồm VAT nếu có)</span>
                                </div>
                            </div>
                        </div>
                        <Button primary>Mua hàng (1)</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;