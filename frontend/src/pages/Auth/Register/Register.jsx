import React from 'react';
import classNames from 'classnames/bind';

import styles from './Register.module.scss';
import RegisterForm from './components/RegisterForm';
import assets from '@/assets';

const cx = classNames.bind(styles);

function Register(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <RegisterForm />
                <div className={cx('register-image')}>
                    <img src={assets.images.registerImage} alt="Something wrong" />
                </div>
            </div>
        </div>
    );
}

export default Register;
