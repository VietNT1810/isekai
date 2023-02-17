import { Box, Tab, Tabs } from '@mui/material';
import classNames from 'classnames/bind';
import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PopupConfirm from '@/components/PopupConfirm';
import * as orderServices from '@/services/orderService';
import styles from './Order.module.scss';
// import OrderList from './components/OrderList';
import OrderSkeleton from '@/components/OrderSkeleton/OrderSkeleton';

const cx = classNames.bind(styles);
const OrderList = React.lazy(() => import('./components/OrderList'));

function Order(props) {
    const [value, setValue] = useState('all');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userToken } = useSelector((state) => state.user);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupData, setPopupData] = useState({});

    const getOrders = async () => {
        setLoading(true);
        await orderServices
            .getUserOrders(userToken, { status: value })
            .then((res) => {
                setOrders(res.data.content);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getOrders();
    }, [value]);

    //handle order
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCancelOrder = async () => {
        await orderServices
            .cancelOrder(userToken, popupData.orderId, { cartId: popupData.cartId })
            .then((res) => {
                getOrders();
                setPopupData({});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <Box sx={{ width: '100%' }}>
                <Box>
                    <Tabs value={value} onChange={handleChange} className={cx('tab')}>
                        <Tab className={cx('title')} label="Tất cả đơn" value="all" />
                        <Tab className={cx('title')} label="Chờ thanh toán" value="awaiting_payment" />
                        <Tab className={cx('title')} label="Đang vận chuyển" value="shipping" />
                        <Tab className={cx('title')} label="Đã giao" value="completed" />
                        <Tab className={cx('title')} label="Đã hủy" value="canceled" />
                    </Tabs>
                </Box>
                <div className="tab-content">
                    <Suspense fallback={<OrderSkeleton />}>
                        {loading ? (
                            <OrderSkeleton />
                        ) : (
                            <OrderList
                                orders={orders}
                                onCancelOrder={(data) => {
                                    setOpenPopup(true);
                                    setPopupData(data);
                                }}
                            />
                        )}
                    </Suspense>
                </div>
            </Box>
            <PopupConfirm
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Hủy đơn hàng"
                content="Bạn có muốn hủy đơn hàng này ?"
                onConfirm={handleCancelOrder}
            />
        </div>
    );
}

export default Order;
