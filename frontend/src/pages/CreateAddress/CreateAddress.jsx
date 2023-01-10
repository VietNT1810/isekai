import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/Button';
import * as addressServices from '@/services/addressService';
import styles from './CreateAddress.module.scss';

const cx = classNames.bind(styles);
const schema = yup.object({
    fullName: yup
        .string()
        .required('Vui lòng nhập họ và tên')
        .test('fullName', 'Họ và tên phải gồm 2 từ trở lên', (value) => value.split(' ').length === 2),
    telephone: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng'),
    city: yup.string().required('Vui lòng chọn Tỉnh/Thành phố'),
    district: yup.string().required('Vui lòng chọn Quận huyện'),
    ward: yup.string().required('Vui lòng chọn Phường xã'),
    street: yup
        .string()
        .required('Vui lòng nhập địa chỉ')
        .test('street', 'Địa chỉ phải gồm 2 từ trở lên', (value) => value.split(' ').length === 2),
});

function CreateAddress(props) {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: {
            fullName: '',
            telephone: '',
            city_id: null,
            city: '',
            district_id: null,
            district: '',
            ward_id: null,
            ward: '',
            street: '',
            is_default: false,
        },
        resolver: yupResolver(schema),
    });

    console.log('err:', errors);

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
        setValue('city', selectText);
        getDistrictList(selectValue);
    };

    const handleSelectDistrictChange = (e) => {
        let selectText = e.target.options[e.target.selectedIndex].text;
        let selectValue = e.target.value;
        setValue('district', selectText);
        getWardList(selectValue);
    };

    const handleSelectWardChange = (e) => {
        let selectText = e.target.options[e.target.selectedIndex].text;
        setValue('ward', selectText);
    };

    const onSubmitForm = (data) => {
        console.log('Data:', data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Tạo sổ địa chỉ</h2>
            </div>
            <div className={cx('content')}>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className={cx('form-group', errors.fullName?.message ? 'has-error' : '')}>
                        <label htmlFor="fullName" className={cx('label')}>
                            Họ và tên:
                        </label>
                        <div>
                            <input
                                type="text"
                                id="fullName"
                                className={cx('input')}
                                placeholder="Nhập họ và tên"
                                {...register('fullName', { required: true })}
                            />
                            {errors.fullName?.message && (
                                <span className={cx('error-message')}>{errors.fullName?.message}</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group', errors.telephone?.message ? 'has-error' : '')}>
                        <label htmlFor="telephone" className={cx('label')}>
                            Số điện thoại:
                        </label>
                        <div>
                            <input
                                type="tel"
                                id="telephone"
                                className={cx('input')}
                                placeholder="Nhập số điện thoại"
                                {...register('telephone', { required: true })}
                            />
                            {errors.telephone?.message && (
                                <span className={cx('error-message')}>{errors.telephone?.message}</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group', errors.city?.message ? 'has-error' : '')}>
                        <label htmlFor="city" className={cx('label')}>
                            Tỉnh/Thành phố:
                        </label>
                        <div>
                            <select
                                id="city"
                                placeholder="Chọn Tỉnh/Thành phố"
                                className={cx('input')}
                                {...register('city_id', {
                                    required: true,
                                })}
                                onFocus={() => {
                                    getCityList();
                                }}
                                onChange={handleSelectCityChange}
                            >
                                <option value="">Chọn Tỉnh/Thành phố</option>
                                {cities.map((city) => (
                                    <option key={city.code} value={city.code}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            {errors.city?.message && (
                                <span className={cx('error-message')}>{errors.city?.message}</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group', errors.district?.message ? 'has-error' : '')}>
                        <label htmlFor="district" className={cx('label')}>
                            Quận huyện:
                        </label>
                        <div>
                            <select
                                id="district"
                                placeholder="Chọn Quận/Huyện"
                                className={cx('input')}
                                {...register('district_id', {
                                    required: true,
                                })}
                                onChange={handleSelectDistrictChange}
                            >
                                <option value="">Chọn Quận/Huyện</option>
                                {districts.map((district) => (
                                    <option key={district.code} value={district.code}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                            {errors.district?.message && (
                                <span className={cx('error-message')}>{errors.district?.message}</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group', errors.ward?.message ? 'has-error' : '')}>
                        <label htmlFor="ward" className={cx('label')}>
                            Phường xã:
                        </label>
                        <div>
                            <select
                                id="ward"
                                placeholder="Chọn Phường/Xã"
                                className={cx('input')}
                                {...register('ward_id', {
                                    required: true,
                                })}
                                onChange={handleSelectWardChange}
                            >
                                <option value="">Chọn Phường/Xã</option>
                                {wards.map((ward) => (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                            {errors.ward?.message && (
                                <span className={cx('error-message')}>{errors.ward?.message}</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group', errors.street?.message ? 'has-error' : '')}>
                        <label htmlFor="street" className={cx('label')}>
                            Địa chỉ:
                        </label>
                        <div>
                            <textarea
                                id="street"
                                className={cx('input')}
                                placeholder="Nhập địa chỉ"
                                {...register('street', { required: true })}
                            />
                            {errors.street?.message && (
                                <span className={cx('error-message')}>{errors.street?.message}</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group', errors.fullName?.message ? 'has-error' : '')}>
                        <label className={cx('label')}>&nbsp;</label>
                        <label className={cx('default-address')}>
                            Đặt làm địa chỉ mặc định
                            <input type="checkbox" {...register('is_default')} />
                            <span className={cx('checkmark')}></span>
                        </label>
                    </div>
                    <div className={cx('form-group', errors.fullName?.message ? 'has-error' : '')}>
                        <label className={cx('label')}>&nbsp;</label>
                        <div className={cx('action-btn')}>
                            <Button primary type="submit">
                                Cập nhật
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAddress;
