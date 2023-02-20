import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/Button';
import * as addressServices from '@/services/addressService';
import styles from './CreateAddress.module.scss';
import { openAlert } from '@/reducers/alertSlice';

const cx = classNames.bind(styles);
const schema = yup.object({
    fullName: yup
        .string()
        .required('Vui lòng nhập họ và tên')
        .test('fullName', 'Họ và tên phải gồm 2 từ trở lên', (value) => value.split(' ').length >= 2),
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
        .test('street', 'Địa chỉ phải gồm 2 từ trở lên', (value) => value.split(' ').length >= 2),
});

function CreateAddress({ type }) {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const { userToken } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const addressId = params.addressId;

    //handle side effect
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (type === 'create') return;
        getAddressInfo(signal);
        getCityList(signal);

        //cleanup function
        return () => controller.abort();
    }, [addressId]);

    //form control react-hook-form
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

    //fetch api
    const getCityList = async (signal) => {
        await addressServices
            .getListCity(signal)
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

    const getAddressInfo = async (signal) => {
        await addressServices
            .getSingleAddress(addressId, userToken, signal)
            .then(async (res) => {
                await getDistrictList(res.content.city_id);
                await getWardList(res.content.district_id);
                const fields = [
                    'fullName',
                    'telephone',
                    'city_id',
                    'city',
                    'district_id',
                    'district',
                    'ward_id',
                    'ward',
                    'street',
                    'is_default',
                ];
                fields.forEach((field) => setValue(field, res.content[field]));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const createAddress = async (data) => {
        await addressServices
            .createAddress(data, userToken)
            .then((res) => {
                dispatch(openAlert({ message: res.message }));
                navigate('/user/account/address');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editAddress = async (data, id) => {
        await addressServices
            .editAddress(data, userToken, id)
            .then((res) => {
                dispatch(openAlert({ message: res.message }));
                navigate('/user/account/address');
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
        type === 'create' ? createAddress(data) : editAddress(data, addressId);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>{addressId ? 'Chỉnh sửa sổ địa chỉ' : 'Tạo sổ địa chỉ'}</h2>
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
