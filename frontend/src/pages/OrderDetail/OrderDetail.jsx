import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating, useMediaQuery } from '@mui/material';

import Button from '@/components/Button/Button';
import { formatVND } from '@/helpers/number';
import { formatTime, getOrderStatusTitle } from '@/helpers/string';
import * as orderServices from '@/services/orderService';
import * as reviewServices from '@/services/reviewsService';
import styles from './OrderDetail.module.scss';
import PopupCreateReview from './components/PopupCreateReview/PopupCreateReview';

const cx = classNames.bind(styles);

function OrderDetail(props) {
    const [orderDetail, setOrderDetail] = useState({});
    const [reviewForm, setReviewForm] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [popupData, setPopupData] = useState('');
    const { userToken } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const orderId = params.orderId;
    const mobile = useMediaQuery('(max-width: 768px)');

    const getTotalPrice = (orders) => {
        const totalPrice = orders?.reduce((totalPrice, item) => totalPrice + item.productId.price * +item.quantity, 0);
        return totalPrice;
    };

    const getPaymentMethodTitle = (method) => {
        const methodTitle = {
            cod: 'khi nhận hàng',
            credit: 'bằng thẻ ghi nợ',
            momo: 'bằng ví Momo',
            'zalo-pay': 'bằng ví ZaloPay',
            atm: 'bằng thẻ ATM nội địa',
        };
        return `Thanh toán ${methodTitle[method] || ''}`;
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getUserOrderDetail = async (signal) => {
            await orderServices
                .getOrderDetail(userToken, orderId, signal)
                .then((result) => {
                    setOrderDetail(result.data.content);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        if (!userToken) return;
        getUserOrderDetail(signal);

        //cleanup function
        return () => controller.abort();
    }, []);

    //create review
    const handleCreateReview = async () => {
        await reviewServices
            .createReview({ ...reviewForm, product: popupData })
            .then((result) => {
                console.log('result:', result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('heading')}>
                    <div className={cx('')}></div>
                    <h3>Chi tiết đơn hàng</h3>
                    <div className={cx('status')}>
                        <span className={cx('shipping')}>Trạng thái: {getOrderStatusTitle(orderDetail.status)}</span>
                        <div className={cx('date')}>Ngày đặt hàng: {formatTime(orderDetail.createdAt)}</div>
                    </div>
                </div>
                <div className={cx('order-info')}>
                    <div className={cx('info-group')}>
                        <div className={cx('title')}>Địa chỉ người nhận</div>
                        <div className={cx('content')}>
                            <span className={cx('fullName')}>{orderDetail.shipping?.fullName}</span>
                            <span className={cx('address')}>
                                Địa chỉ: {orderDetail.shipping?.street}, {orderDetail.shipping?.ward},{' '}
                                {orderDetail.shipping?.district}, {orderDetail.shipping?.city}
                            </span>
                            <span className={cx('telephone')}>Điện thoại: {orderDetail.shipping?.telephone}</span>
                        </div>
                    </div>
                    <div className={cx('info-group')}>
                        <div className={cx('title')}>Hình thức giao hàng</div>
                        <div className={cx('content')}>
                            <span className={cx('shipping-method')}>Giao hàng tiết kiệm</span>
                        </div>
                    </div>
                    <div className={cx('info-group')}>
                        <div className={cx('title')}>Hình thức thanh toán</div>
                        <div className={cx('content')}>
                            <span className={cx('payment-method')}>{getPaymentMethodTitle(orderDetail.method)}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('product')}>
                    <div className={cx('product-header')}>
                        <p className={cx('product-title', 'product-heading')}>Sản phẩm</p>
                        {!mobile && (
                            <>
                                <div className={cx('product-title')}>Đơn giá</div>
                                <div className={cx('product-title')}>Số lượng</div>
                                <div className={cx('product-title', 'product-total')}>Thành tiền</div>
                            </>
                        )}
                    </div>
                    <div className={cx('product-info')}>
                        {orderDetail.products?.map((order) => (
                            <div key={order.productId._id} className={cx('product-item')}>
                                <div className={cx('product-detail')}>
                                    <div className={cx('info')}>
                                        <div className={cx('image-container')}>
                                            <div className={cx('image-box')}>
                                                <img
                                                    src={order.productId.productImage}
                                                    className={cx('image')}
                                                    alt="Error image"
                                                    width={30}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={cx('name')}
                                            onClick={() => {
                                                navigate(`/product/${order.productId.slug}`);
                                            }}
                                        >
                                            <span>{order.productId.name}</span>
                                            {mobile && (
                                                <div className={cx('mobile-price')}>
                                                    <span>
                                                        {formatVND(order.productId.price)} x {order.quantity}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {!mobile && (
                                        <>
                                            <div className={cx('block')}>{formatVND(order.productId.price)}</div>
                                            <div className={cx('block')}>{order.quantity}</div>
                                            <div className={cx('block', 'total')}>
                                                {formatVND(order.productId.price * order.quantity)}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className={cx('product-review')}>
                                    {orderDetail.status == 'completed' && (
                                        <Button
                                            outline
                                            className={cx('btn')}
                                            onClick={() => {
                                                setOpenPopup(true);
                                                setPopupData(order.productId._id);
                                            }}
                                        >
                                            Viết nhận xét
                                        </Button>
                                    )}
                                    {orderDetail.status == 'awaiting_payment' ||
                                    orderDetail.status == 'shipping' ? null : (
                                        <Button
                                            outline
                                            className={cx('btn')}
                                            onClick={() => {
                                                navigate(`/product/${order.productId.slug}`);
                                            }}
                                        >
                                            Mua lại
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <p className={cx('product-total')}>
                            Tổng số tiền:
                            <span className={cx('product-total__price')}>
                                {formatVND(getTotalPrice(orderDetail.products))}
                            </span>
                        </p>
                    </div>
                </div>
                <PopupCreateReview
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    title="Viết nhận xét"
                    onConfirm={handleCreateReview}
                    onClose={() => {
                        setPopupData('');
                    }}
                >
                    <div className={cx('review-form')}>
                        <div className={cx('rating')}>
                            <span className={cx('title')}>Vui lòng đánh giá</span>
                            <Rating
                                className={cx('star')}
                                onChange={(event, newValue) => {
                                    setReviewForm({ ...reviewForm, rating: newValue });
                                }}
                                size="large"
                            />
                        </div>
                        <textarea
                            cols={150}
                            className={cx('review-field')}
                            placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé."
                            onChange={(e) => {
                                setReviewForm({ ...reviewForm, review: e.target.value });
                            }}
                        ></textarea>
                    </div>
                </PopupCreateReview>
            </div>
        </div>
    );
}

export default OrderDetail;
