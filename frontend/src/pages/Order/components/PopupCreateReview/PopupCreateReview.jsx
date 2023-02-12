import classNames from 'classnames/bind';

import styles from './PopupCreateReview.module.scss';
import Button from '@/components/Button';
import Popup from '@/components/Popup';

const cx = classNames.bind(styles);

function PopupFooter({ setOpenPopup, onConfirm }) {
    return (
        <>
            <Button
                outline
                className={cx('dialog-button')}
                onClick={() => {
                    onConfirm();
                    setOpenPopup(false);
                }}
            >
                Xác nhận
            </Button>
            <Button
                primary
                className={cx('dialog-button')}
                onClick={() => {
                    setOpenPopup(false);
                }}
            >
                Hủy
            </Button>
        </>
    );
}

function PopupCreateReview({ openPopup, setOpenPopup, title, content, onConfirm, children }) {
    return (
        <Popup
            openPopup={openPopup}
            title={title}
            content={content}
            footer={<PopupFooter setOpenPopup={setOpenPopup} onConfirm={onConfirm} />}
            className={cx('popup')}
        >
            {children}
        </Popup>
    );
}

export default PopupCreateReview;
