import React from 'react';
import classNames from 'classnames/bind';

import styles from './LoginForm.module.scss';
import InputField from '@/components/InputField';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginForm(props) {
    return (
        <div className={cx('login-form')}>
            <h1>Đăng nhập</h1>
            <h4>
                Người mới?
                <NavLink to="/register">Tạo tài khoản ở đây</NavLink>
            </h4>
            <InputField variant="filled" label="Email" fullWidth />
        </div>
    );
}

export default LoginForm;
