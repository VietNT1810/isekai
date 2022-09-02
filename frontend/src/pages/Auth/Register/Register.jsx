import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Register.module.scss';
import RegisterForm from './components/RegisterForm';
import assets from '@/assets';
import { registerUser } from '@/actions/userAction';
import { Navigate, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Register(props) {
    const { loading, userInfo, error, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) navigate('/login');
    }, [navigate, success]);

    const handleSubmit = (data) => {
        console.log('register', data);
        data.email = data.email.toLowerCase();
        dispatch(registerUser(data));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <RegisterForm submitForm={handleSubmit} />
                <div className={cx('register-image')}>
                    <img src={assets.images.registerImage} alt="Something wrong" />
                </div>
            </div>
        </div>
    );
}

export default Register;
