import React from 'react';
import classNames from 'classnames/bind';

import styles from './CartList.module.scss';
import { formatVND } from '@/helpers/number';
import { Add, DeleteOutline, Remove } from '@mui/icons-material';

const cx = classNames.bind(styles);

function CartList({ carts }) {
    return (
        <div className={cx('cart-list')}>
            {carts.map((cart) => (
                <div key={cart.productId._id} className={cx('cart')}>
                    <div className={cx('product-info')}>
                        <div className={cx('cart-image-container')}>
                            <div className={cx('cart-image-box')}>
                                <img
                                    src={cart.productId.productImage}
                                    className={cx('cart-image')}
                                    alt="Error image"
                                    width={30}
                                />
                            </div>
                        </div>
                        <div className={cx('cart-name')}>
                            <span>{cart.productId.name}</span>
                        </div>
                    </div>
                    <span className={cx('product-price')}>{formatVND(cart.productId.price)}</span>
                    <div className={cx('cart-quantity')}>
                        <div className={cx('action')}>
                            <button>
                                <Remove />
                            </button>
                            <input
                                type="text"
                                value={cart.quantity}
                                onChange={() => {
                                    console.log();
                                }}
                            />
                            <button>
                                <Add />
                            </button>
                        </div>
                    </div>
                    <span className={cx('final-price')}>{formatVND(cart.productId.price * cart.quantity)}</span>
                    <div className={cx('delete-btn')}>
                        <DeleteOutline fontSize="large" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CartList;
