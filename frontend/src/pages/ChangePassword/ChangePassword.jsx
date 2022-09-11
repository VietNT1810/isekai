import React from 'react';
import classNames from 'classnames/bind';

import styles from './ChangePassword.module.scss';
import ChangePasswordForm from './components/ChangePasswordForm';

const cx = classNames.bind(styles);

function ChangePassword(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>Đổi mật khẩu</h2>
                    <small>Để bảo mật mật khẩu, vui lòng không chia sẻ mật khẩu cho người khác</small>
                </div>
                <ChangePasswordForm />
            </div>
        </div>
    );
}

export default ChangePassword;
