import React from 'react';
import classNames from 'classnames/bind';

import styles from './CartList.module.scss';
import { formatVND } from '@/helpers/number';
import { Add, DeleteOutline, Remove } from '@mui/icons-material';

const cx = classNames.bind(styles);

const products = [
    {
        productId: {
            _id: '62fc950945d2f2bd6c5475b5',
            name: 'product 2 asdad asdad asdad asdad asdad asdad asdad asdad asdad asdad asdad asdad asdad asdad asdad asdad',
            price: 200000,
            productImage: 'https://res.cloudinary.com/supafrankie/image/upload/v1661155551/wig/Ayaka_igj5qi.png',
        },
        quantity: '5',
    },
    {
        productId: {
            _id: '62fc93e245d2f2bd6c5475ae',
            name: 'product 1',
            price: 100000,
            productImage:
                'https://res.cloudinary.com/supafrankie/image/upload/v1660890497/clothes/TSM0658YYH_1_800x_x0yizs.png',
        },
        quantity: '5',
    },
];

function CartList(props) {
    return (
        <div className={cx('cart-list')}>
            {products.map((cart) => (
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
                        <span className={cx('cart-name')}>{cart.productId.name}</span>
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
