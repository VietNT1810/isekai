import classNames from 'classnames/bind';

import styles from './PopupConfirm.module.scss';
import Button from '@/components/Button';
import Popup from '@/components/Popup';

const cx = classNames.bind(styles);

function PopupContent({ content }) {
    return <span className={cx('dialog-content')}>{content}</span>;
}

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

function PopupConfirm({ openPopup, setOpenPopup, title, content, onConfirm }) {
    return (
        <Popup
            openPopup={openPopup}
            title={title}
            content={<PopupContent content={content} />}
            footer={<PopupFooter setOpenPopup={setOpenPopup} onConfirm={onConfirm} />}
        />
    );
}

export default PopupConfirm;
