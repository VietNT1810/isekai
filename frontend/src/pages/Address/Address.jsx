import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Address.module.scss';
import Button from '@/components/Button';
import PopupConfirm from '@/components/PopupConfirm';
import * as addressService from '@/services/addressService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Address(props) {
    const { userToken } = useSelector((state) => state.user);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupData, setPopupData] = useState('');
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    const getAddresses = async () => {
        await addressService
            .getUserAddress(userToken)
            .then((res) => {
                console.log(res.content);
                setAddresses(res.content);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(async () => {
        getAddresses();
    }, []);

    const handleDeleteAddress = async () => {
        console.log('Click delete address:', popupData);
        await addressService
            .deleteUserAddress(userToken, popupData)
            .then((res) => {
                console.log(res);
                getAddresses();
                setPopupData('');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Sổ địa chỉ</h2>
            </div>
            <Button
                primary
                className={cx('create-address')}
                onClick={() => {
                    navigate('create');
                }}
            >
                Thêm địa chỉ mới
            </Button>
            <div className={cx('content')}>
                {addresses.map((address, index) => (
                    <div className={cx('item')} key={index}>
                        <div className={cx('info')}>
                            <div className={cx('name')}>
                                {address.fullName.toUpperCase()}
                                {address.defaultAddress && <span>Mặc định</span>}
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
                            {!address.defaultAddress && (
                                <button
                                    className={cx('delete')}
                                    onClick={() => {
                                        setOpenPopup(true);
                                        setPopupData(address._id);
                                    }}
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <PopupConfirm
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Xóa địa chỉ"
                content="Bạn có muốn xóa địa chỉ này ?"
                onConfirm={handleDeleteAddress}
            />
        </div>
    );
}

export default Address;
