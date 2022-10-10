import { Add, DeleteOutline, Remove } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './CartList.module.scss';
import { formatVND } from '@/helpers/number';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function CartList({ carts }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteConfirm = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleQuantityChange = (e) => {
        console.log(e.target.value);
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
                            <button>
                                <Remove />
                            </button>
                            <input type="text" value={cart.quantity} onChange={handleQuantityChange} />
                            <button>
                                <Add />
                            </button>
                        </div>
                    </div>
                    <span className={cx('final-price')}>{formatVND(cart.productId.price * cart.quantity)}</span>
                    <div className={cx('delete-btn')}>
                        <DeleteOutline fontSize="large" onClick={handleClickOpen} />
                    </div>
                </div>
            ))}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={cx('dialog')}
            >
                <DialogTitle id="alert-dialog-title" className={cx('dialog-title')}>
                    Xóa sản phẩm ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={cx('dialog-content')}>
                        Bạn có muốn xóa sản phẩm đang chọn?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button outline className={cx('dialog-button')} onClick={handleDeleteConfirm}>
                        Xác nhận
                    </Button>
                    <Button primary className={cx('dialog-button')} onClick={handleClose}>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CartList;
