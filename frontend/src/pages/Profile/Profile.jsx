import { Divider } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from '@/components/Button';
import { hidePhone } from '@/helpers/number';
import { hideEmail } from '@/helpers/string';

import assets from '@/assets';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile(props) {
    const { loading, userInfo } = useSelector((state) => state.user);
    const [fileInputState, setFileInputState] = useState('');
    const [previewAvatar, setPreviewAvatar] = useState('');

    let phone = '0868402367';
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

    // console.log('userInfo:', userInfo);
    // console.log('previewAvatar:', previewAvatar);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>Hồ Sơ Của Tôi</h2>
                    <small>Quản lý thông tin hồ sơ để bảo mật tài khoản</small>
                </div>
                <div className={cx('content')}>
                    <div className={cx('avatar')}>
                        <label htmlFor="uploadAvatar" className={cx('upload-image')}>
                            <img
                                src={previewAvatar || userInfo?.avatar || assets.icons.iconCamera}
                                alt="Avatar error"
                            />
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
                    <Divider orientation="vertical" flexItem />
                    <div className={cx('user-info')}>
                        <form className={cx('form')}>
                            <div className={cx('form-group')}>
                                <label htmlFor="username">Username:</label>
                                <span>admin</span>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="name">Tên:</label>
                                {false ? (
                                    <span>Admin123</span>
                                ) : (
                                    <input type="text" id="name" placeholder="Nhập tên của bạn" />
                                )}
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="phone">Số điện thoại:</label>
                                <span>{hidePhone(phone.toString())}</span>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="gender">Giới tính:</label>
                                <div className={cx('form-checkbox')}>
                                    <label htmlFor="male">Nam</label>
                                    <input type="radio" id="male" name="gender" value="male" defaultChecked />
                                </div>
                                <div className={cx('form-checkbox')}>
                                    <label htmlFor="female">Nữ</label>
                                    <input type="radio" id="female" name="gender" value="female" />
                                </div>
                                <div className={cx('form-checkbox')}>
                                    <label htmlFor="other">Khác</label>
                                    <input type="radio" id="other" name="gender" value="other" />
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <label>Email:</label>
                                <span>{hideEmail('admin@admin.com')}</span>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="address">Địa chỉ:</label>
                                <textarea name="address" id="address" rows="3" placeholder="Nhập địa chỉ của bạn" />
                            </div>
                            <NavLink to="/user/account/change-password" className={cx('change-password')}>
                                <small>Đổi mật khẩu?</small>
                            </NavLink>
                            <Button primary>Lưu</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
