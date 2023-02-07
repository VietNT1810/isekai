import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import styles from './Order.module.scss';
import * as orderServices from '@/services/orderService';
import OrderList from './components/OrderList';

const cx = classNames.bind(styles);

function Order(props) {
    const [value, setValue] = React.useState('all');
    const [orders, setOrders] = useState([]);
    const { userToken } = useSelector((state) => state.user);

    useEffect(async () => {
        await orderServices
            .getUserOrders(userToken, { status: value })
            .then((res) => {
                setOrders(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log('newValue:', newValue);
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
                    <OrderList orders={orders} />
                </div>
            </Box>
        </div>
    );
}

export default Order;