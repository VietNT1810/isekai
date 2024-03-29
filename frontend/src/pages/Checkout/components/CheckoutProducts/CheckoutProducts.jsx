import React from 'react';
import classNames from 'classnames/bind';
import { useMediaQuery } from '@mui/material';

import styles from './CheckoutProducts.module.scss';
import { formatVND } from '@/helpers/number';

const cx = classNames.bind(styles);

function CheckoutProducts({ carts }) {
    const mobile = useMediaQuery('(max-width: 595px)');

    return (
        <>
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
                            {mobile && (
                                <div className={cx('mobile-price')}>
                                    <span>
                                        {formatVND(cart.productId.price)} x {cart.quantity}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    {!mobile && (
                        <>
                            <div className={cx('block')}>{formatVND(cart.productId.price)}</div>
                            <div className={cx('block')}>{cart.quantity}</div>
                            <div className={cx('block', 'total')}>
                                {formatVND(cart.productId.price * cart.quantity)}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default CheckoutProducts;
