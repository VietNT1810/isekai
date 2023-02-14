import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './OrderDetail.module.scss';
import * as orderServices from '@/services/orderService';

const cx = classNames.bind(styles);

function OrderDetail(props) {
    const { userToken } = useSelector((state) => state.user);
    const [orderDetail, setOrderDetail] = useState({});
    const params = useParams();
    const orderId = params.orderId;

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
                    // console.log(err);
                });
        };
        if (!userToken) return;
        getUserOrderDetail(signal);

        //cleanup function
        return () => controller.abort();
    }, []);

    console.log('userToken:', userToken);

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('heading')}>
                    <div className={cx('')}></div>
                    <h3>Chi tiết đơn hàng</h3>
                    <div className={cx('status')}>
                        <span className={cx('shipping')}>Trạng thái: {orderDetail.status}</span>
                        <div className={cx('date')}>Ngày đặt hàng: {orderDetail.createdAt}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
