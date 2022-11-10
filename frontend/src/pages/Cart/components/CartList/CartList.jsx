import { removeUserCart, updateUserCart } from '@/actions/cartAction';
import { Add, DeleteOutline, Remove } from '@mui/icons-material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Dialog from '@/components/Dialog';
import { formatVND } from '@/helpers/number';
import { changeCartQuantity, removeCart } from '../../cartSlice';
import styles from './CartList.module.scss';

const cx = classNames.bind(styles);

function CartList({ carts, isLoading }) {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState('');

    const handleDeleteCart = (id) => {
        setDialogData(id);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(removeUserCart({ productId: dialogData }))
            .unwrap()
            .then(() => {
                dispatch(removeCart(dialogData));
                setDialogData('');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleIncreaseChange = (id, quantity) => {
        dispatch(changeCartQuantity({ productId: id, quantity: +quantity + 1 }));
        dispatch(updateUserCart({ productId: id }));
    };

    const handleQuantityChange = (e, id) => {
        dispatch(changeCartQuantity({ productId: id, quantity: e.target.value }));
        dispatch(updateUserCart({ productId: id }));
    };

    const handleDecreaseChange = (id, quantity) => {
        if (quantity > 1) {
            dispatch(changeCartQuantity({ productId: id, quantity: +quantity - 1 }));
            dispatch(updateUserCart({ productId: id }));
        } else {
            handleDeleteCart(id);
        }
    };

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
                            <button
                                disabled={isLoading}
                                onClick={() => handleDecreaseChange(cart.productId._id, cart.quantity)}
                            >
                                <Remove />
                            </button>
                            <input
                                type="tel"
                                disabled={isLoading}
                                value={cart.quantity}
                                onChange={(event) => handleQuantityChange(event, cart.productId._id)}
                            />
                            <button
                                disabled={isLoading}
                                onClick={() => handleIncreaseChange(cart.productId._id, cart.quantity)}
                            >
                                <Add />
                            </button>
                        </div>
                    </div>
                    <span className={cx('final-price')}>{formatVND(cart.productId.price * cart.quantity)}</span>
                    <div className={cx('delete-btn')}>
                        <DeleteOutline fontSize="large" onClick={() => handleDeleteCart(cart.productId._id)} />
                    </div>
                </div>
            ))}
            <Dialog
                title="Xóa sản phẩm ?"
                isOpen={openDialog}
                handleClose={handleClose}
                onConfirm={handleDeleteConfirm}
            >
                Bạn có muốn xóa sản phẩm đang chọn?
            </Dialog>
        </div>
    );
}

export default CartList;
