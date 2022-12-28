import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './CreateAddress.module.scss';
import * as addressServices from '@/services/addressService';

const cx = classNames.bind(styles);

function CreateAddress(props) {
    const [addressForm, setAddressForm] = useState({
        fullName: '',
        phone: '',
        city: '',
        district: '',
        ward: '',
        address: '',
        defaultAddress: false,
    });
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    //fetch api
    const getCityList = async () => {
        await addressServices
            .getListCity()
            .then((res) => {
                setCities(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDistrictList = async (code) => {
        await addressServices
            .getListDistrict(code)
            .then((res) => {
                setDistricts(res.districts);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getWardList = async (code) => {
        await addressServices
            .getListWard(code)
            .then((res) => {
                setWards(res.wards);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //handle event
    const handleSelectCityChange = (e) => {
        let selectText = e.target.options[e.target.selectedIndex].text;
        let selectValue = e.target.value;
        setAddressForm({ ...addressForm, city: selectText });
        getDistrictList(selectValue);
    };

    const handleSelectDistrictChange = (e) => {
        let selectText = e.target.options[e.target.selectedIndex].text;
        let selectValue = e.target.value;
        setAddressForm({ ...addressForm, district: selectText });
        getWardList(selectValue);
    };

    const handleSelectWardChange = (e) => {
        let selectText = e.target.options[e.target.selectedIndex].text;
        setAddressForm({ ...addressForm, ward: selectText });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Tạo sổ địa chỉ</h2>
            </div>
            <div className={cx('content')}>
                <form>
                    <div className={cx('form-group')}>
                        <label htmlFor="fullName" className={cx('label')}>
                            Họ và tên:
                        </label>
                        <input type="text" placeholder="Nhập họ và tên" className={cx('input')} />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="phone" className={cx('label')}>
                            Số điện thoại:
                        </label>
                        <input type="tel" id="phone" placeholder="Nhập số điện thoại" className={cx('input')} />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="city" className={cx('label')}>
                            Tỉnh/Thành phố:
                        </label>
                        <select
                            id="city"
                            placeholder="Chọn Tỉnh/Thành phố"
                            className={cx('input')}
                            onFocus={() => {
                                getCityList();
                            }}
                            onChange={handleSelectCityChange}
                        >
                            <option>Chọn Tỉnh/Thành phố</option>
                            {cities.map((city) => (
                                <option key={city.code} value={city.code}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="district" className={cx('label')}>
                            Quận huyện:
                        </label>
                        <select
                            id="district"
                            placeholder="Chọn Quận/Huyện"
                            className={cx('input')}
                            onChange={handleSelectDistrictChange}
                        >
                            <option>Chọn Quận/Huyện</option>
                            {districts.map((city) => (
                                <option key={city.code} value={city.code}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="ward" className={cx('label')}>
                            Phường xã:
                        </label>
                        <select
                            id="ward"
                            placeholder="Chọn Phường/Xã"
                            className={cx('input')}
                            onChange={handleSelectWardChange}
                        >
                            <option>Chọn Phường/Xã</option>
                            {wards.map((city) => (
                                <option key={city.code} value={city.code}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="fullName" className={cx('label')}>
                            Địa chỉ:
                        </label>
                        <textarea placeholder="Nhập địa chỉ" className={cx('input')} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAddress;
