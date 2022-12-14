import classNames from 'classnames/bind';

import styles from './PopupConfirm.module.scss';
import Button from '@/components/Button';
import Popup from '@/components/Popup';

const cx = classNames.bind(styles);

function PopupContent() {
    return <span className={cx('dialog-content')}>Bạn có muốn xóa sản phẩm đang chọn?</span>;
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

function PopupConfirm({ openPopup, setOpenPopup, onConfirm }) {
    return (
        <Popup
            openPopup={openPopup}
            title="Xóa sản phẩm"
            content={<PopupContent />}
            footer={<PopupFooter setOpenPopup={setOpenPopup} onConfirm={onConfirm} />}
        />
    );
}

export default PopupConfirm;
