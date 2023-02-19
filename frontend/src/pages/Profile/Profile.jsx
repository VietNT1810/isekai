import { Divider, useMediaQuery } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from '@/components/Button';
import { hidePhone } from '@/helpers/number';
import { hideEmail } from '@/helpers/string';

import { updateUserProfile } from '@/actions/userAction';
import assets from '@/assets';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile(props) {
    const matches = useMediaQuery('(max-width: 768px)');

    //state
    const { loading, userInfo } = useSelector((state) => state.user);
    const [fileInputState, setFileInputState] = useState('');
    const [previewAvatar, setPreviewAvatar] = useState('');
    const [form, setForm] = useState({});

    const dispatch = useDispatch();

    //handle file
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewAvatar(reader.result);
        };
    };

    //handle form
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        console.log(form);
        let formData = {
            ...form,
            fileString: previewAvatar,
        };
        console.log('formData', formData);
        dispatch(updateUserProfile(formData));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Hồ Sơ Của Tôi</h2>
                <small>Quản lý thông tin hồ sơ để bảo mật tài khoản</small>
            </div>
            <div className={cx('content')}>
                <div className={cx('avatar')}>
                    <label htmlFor="uploadAvatar" className={cx('upload-image')}>
                        <img src={previewAvatar || userInfo?.avatar || assets.icons.iconCamera} alt="Avatar error" />
                    </label>
                    <label htmlFor="uploadAvatar" className={cx('upload-btn')}>
                        Chọn ảnh
                    </label>
                    <input
                        type="file"
                        id="uploadAvatar"
                        accept=".jpg,.jpeg,.png"
                        value={fileInputState}
                        onChange={handleFileInputChange}
                        hidden
                    />
                    <div className={cx('file-accept')}>
                        <small>Dụng lượng file tối đa 1 MB</small>
                        <small>Định dạng: .JPEG, .PNG</small>
                    </div>
                </div>
                {!matches && <Divider orientation="vertical" flexItem />}
                <div className={cx('user-info')}>
                    <form className={cx('form')}>
                        <div className={cx('form-group')}>
                            <label className={cx('label')} htmlFor="username">
                                Username:
                            </label>
                            <span>{userInfo?.username}</span>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')} htmlFor="fullName">
                                Tên:
                            </label>
                            {userInfo?.fullName ? (
                                <span>{userInfo.fullName}</span>
                            ) : (
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Nhập tên của bạn"
                                    onChange={handleFormChange}
                                />
                            )}
                        </div>
                        {/* <div className={cx('form-group')}>
                                <label htmlFor="phone">Số điện thoại:</label>
                                <span>{hidePhone(userInfo?.phone.toString())}</span>
                            </div> */}
                        <div className={cx('form-group')}>
                            <label className={cx('label')} htmlFor="gender">
                                Giới tính:
                            </label>
                            <div className={cx('form-checkbox')}>
                                <label htmlFor="male">Nam</label>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={userInfo?.gender === 'male'}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className={cx('form-checkbox')}>
                                <label htmlFor="female">Nữ</label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={userInfo?.gender === 'female'}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className={cx('form-checkbox')}>
                                <label htmlFor="other">Khác</label>
                                <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    value="other"
                                    checked={userInfo?.gender === 'other'}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>Email:</label>
                            <span>{hideEmail(userInfo?.email)}</span>
                        </div>
                        <Button primary onClick={handleSaveProfile}>
                            Lưu
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
