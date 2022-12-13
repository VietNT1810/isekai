import Button from '@/components/Button';
import classNames from 'classnames/bind';

import styles from './Address.module.scss';

const cx = classNames.bind(styles);

const addresses = [
    {
        fullName: 'NGUYỄN TUẤN VIỆT',
        address: 'Số 37 ngõ 273 Nguyễn Khoái',
        ward: 'Thanh Luong',
        district: 'Hai Ba Trung',
        city: 'Ha Noi',
        phone: '0868402367',
        default: true,
    },
    {
        fullName: 'NGUYỄN TUẤN VIỆT',
        address: 'Số 37 ngõ 273 Nguyễn Khoái',
        ward: 'Thanh Luong',
        district: 'Hai Ba Trung',
        city: 'Ha Noi',
        phone: '0868402367',
        default: false,
    },
    {
        fullName: 'NGUYỄN TUẤN VIỆT',
        address: 'Số 37 ngõ 273 Nguyễn Khoái',
        ward: 'Thanh Luong',
        district: 'Hai Ba Trung',
        city: 'Ha Noi',
        phone: '0868402367',
        default: false,
    },
];

function Address(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Sổ địa chỉ</h2>
            </div>
            <Button primary className={cx('create-address')}>
                Thêm địa chỉ mới
            </Button>
            <div className={cx('content')}>
                {addresses.map((address, index) => (
                    <div className={cx('item')} key={index}>
                        <div className={cx('info')}>
                            <div className={cx('name')}>
                                {address.fullName.toUpperCase()}
                                {address.default && <span>Mặc định</span>}
                            </div>
                            <div className={cx('address')}>
                                <span>Địa chỉ:</span> {address.address}, Phường {address.ward}, Quận {address.district},{' '}
                                {address.city}
                            </div>
                            <div className={cx('phone')}>
                                <span>Điện thoại:</span> {address.phone}
                            </div>
                        </div>
                        <div className={cx('action')}>
                            <button className={cx('edit')}>Chỉnh sửa</button>
                            <button className={cx('delete')}>Xóa</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Address;
