import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import classNames from 'classnames/bind';

import styles from './Popup.module.scss';

const cx = classNames.bind(styles);

function Popup({ title, content, footer, openPopup }) {
    return (
        <Dialog open={openPopup} className={cx('popup')}>
            <DialogTitle className={cx('popup-title')}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText className={cx('popup-content')}>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>{footer}</DialogActions>
        </Dialog>
    );
}

export default Popup;
