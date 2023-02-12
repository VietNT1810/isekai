import { useState } from 'react';
import { Block, CreditCard, LocalShipping, Star } from '@mui/icons-material';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import assets from '@/assets';
import Button from '@/components/Button';
import { formatVND } from '@/helpers/number';
import PopupCreateReview from '../PopupCreateReview/PopupCreateReview';
import styles from './OrderList.module.scss';
import { Rating } from '@mui/material';

const cx = classNames.bind(styles);

function OrderList({ orders, onCancelOrder }) {
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();

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

    //create review
    const handleCreateReview = () => {
        console.log('create review');
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
                                    <span className={cx('product-quantity')}>x{product.quantity}</span>
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
                            {order.status == 'awaiting_payment' || order.status == 'shipping' ? (
                                <Button
                                    outline
                                    className={cx('btn')}
                                    onClick={() => {
                                        onCancelOrder({ orderId: order._id, cartId: order.cart });
                                    }}
                                >
                                    Hủy đơn hàng
                                </Button>
                            ) : (
                                <Button
                                    outline
                                    className={cx('btn')}
                                    onClick={() => {
                                        navigate('/cart');
                                    }}
                                >
                                    Mua lại
                                </Button>
                            )}
                            {order.status == 'completed' && (
                                <Button
                                    outline
                                    className={cx('btn')}
                                    onClick={() => {
                                        setOpenPopup(true);
                                    }}
                                >
                                    Viết nhận xét
                                </Button>
                            )}
                            <Button outline className={cx('btn')}>
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
            {orders.length == 0 && (
                <div className={cx('empty-order')}>
                    <img src={assets.images.emptyOrder} className={cx('image')} alt="Empty order image" />
                    <p>Chưa có đơn hàng</p>
                </div>
            )}
            <PopupCreateReview
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Viết nhận xét"
                onConfirm={handleCreateReview}
            >
                <div className={cx('review-form')}>
                    <div className={cx('rating')}>
                        <span className={cx('title')}>Vui lòng đánh giá</span>
                        <Rating
                            className={cx('star')}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                            }}
                            size="large"
                        />
                    </div>
                    <textarea
                        cols={150}
                        className={cx('review-field')}
                        placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé."
                    ></textarea>
                </div>
            </PopupCreateReview>
        </div>
    );
}

export default OrderList;
