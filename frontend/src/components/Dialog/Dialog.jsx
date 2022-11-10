import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import styles from './Dialog.module.scss';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function Dialog({ title, children, isOpen, handleClose, onConfirm }) {
    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <MuiDialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={cx('dialog')}
        >
            <DialogTitle id="alert-dialog-title" className={cx('dialog-title')}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className={cx('dialog-content')}>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button outline className={cx('dialog-button')} onClick={handleConfirm}>
                    Xác nhận
                </Button>
                <Button primary className={cx('dialog-button')} onClick={handleClose}>
                    Hủy
                </Button>
            </DialogActions>
        </MuiDialog>
    );
}

export default Dialog;
