import React from 'react';
import classNames from 'classnames/bind';
import { Block, CreditCard, LocalShipping } from '@mui/icons-material';

import styles from './OrderList.module.scss';
import { formatVND } from '@/helpers/number';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function OrderList({ orders }) {
    const getStatusIcon = (status) => {
        const statusIcon = {
            awaiting_payment: <CreditCard fontSize="large" />,
            shipping: <LocalShipping fontSize="large" />,
            completed: <LocalShipping fontSize="large" />,
            canceled: <Block fontSize="large" />,
        };
        return statusIcon[status] || null;
    };

    const getStatusTitle = (status) => {
        const statusTitle = {
            awaiting_payment: 'Chờ thanh toán',
            shipping: 'Đang vận chuyển',
            completed: 'Đã giao',
            canceled: 'Đã hủy',
        };
        return statusTitle[status] || '';
    };

    const getTotalPrice = (orders) => {
        const totalPrice = orders.reduce((totalPrice, item) => totalPrice + item.productId.price * +item.quantity, 0);
        return formatVND(totalPrice);
    };

    return (
        <div className={cx('order-list')}>
            {orders.map((order) => (
                <div className={cx('order-item')} key={order._id}>
                    <div className={cx('order-status')}>
                        {getStatusIcon(order.status)}
                        <span>{getStatusTitle(order.status)}</span>
                    </div>
                    {order.products.map((product) => (
                        <div className={cx('order-product')} key={product.productId._id}>
                            <div className={cx('product-detail')}>
                                <div className={cx('product-image')}>
                                    <img src={product.productId.productImage} alt={product.productId.name} />
                                    <span className={cx('product-quantity')}>x2</span>
                                </div>
                                <div className={cx('product-info')}>
                                    <span className={cx('product-name')}>{product.productId.name}</span>
                                </div>
                            </div>
                            <div className={cx('product-price')}>
                                <span>{formatVND(product.productId.price * product.quantity)}</span>
                            </div>
                        </div>
                    ))}
                    <div className={cx('order-action')}>
                        <div className={cx('total-money')}>
                            <span>Tổng tiền:</span>
                            <span>{getTotalPrice(order.products)}</span>
                        </div>
                        <div className={cx('btn-group')}>
                            {order.status == ('awaiting_payment' || 'shipping') ? (
                                <Button outline className={cx('btn')}>
                                    Hủy đơn hàng
                                </Button>
                            ) : (
                                <Button outline className={cx('btn')}>
                                    Mua lại
                                </Button>
                            )}
                            <Button outline className={cx('btn')}>
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderList;
