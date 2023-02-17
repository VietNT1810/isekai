import { CircularProgress } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Address.module.scss';
import Button from '@/components/Button';
import PopupConfirm from '@/components/PopupConfirm';
import * as addressService from '@/services/addressService';

const cx = classNames.bind(styles);

function Address(props) {
    const { userToken } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupData, setPopupData] = useState('');
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    const getAddresses = async () => {
        setLoading(true);
        await addressService
            .getUserAddress(userToken)
            .then((res) => {
                console.log(res.content);
                setAddresses(res.content);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(async () => {
        getAddresses();
    }, []);

    const handleDeleteAddress = async () => {
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
            {loading ? (
                <CircularProgress sx={{ alignSelf: 'center', margin: '24px 0px' }} />
            ) : (
                <div className={cx('content')}>
                    {addresses.map((address, index) => (
                        <div className={cx('item')} key={index}>
                            <div className={cx('info')}>
                                <div className={cx('name')}>
                                    {address.fullName.toUpperCase()}
                                    {address.is_default && <span>Mặc định</span>}
                                </div>
                                <div className={cx('address')}>
                                    <span>Địa chỉ:</span> {address.street}, {address.ward}, {address.district},{' '}
                                    {address.city}
                                </div>
                                <div className={cx('phone')}>
                                    <span>Điện thoại:</span> {address.telephone}
                                </div>
                            </div>
                            <div className={cx('action')}>
                                <button
                                    className={cx('edit')}
                                    onClick={() => {
                                        navigate(`edit/${address._id}`);
                                    }}
                                >
                                    Chỉnh sửa
                                </button>
                                {!address.is_default && (
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
            )}
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
