import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Register.module.scss';
import RegisterForm from './components/RegisterForm';
import assets from '@/assets';
import { registerUser } from '@/actions/userAction';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const cx = classNames.bind(styles);

function Register(props) {
    const matches = useMediaQuery('(max-width: 768px)');
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo, error, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (data) => {
        data.email = data.email.toLowerCase();
        setIsLoading(true);
        dispatch(registerUser(data))
            .unwrap()
            .then((res) => {
                setIsLoading(false);
                location.state?.slug ? navigate(`/product/${location.state.slug}`) : navigate('/');
            })
            .catch((error) => {
                setIsLoading(false);
                console.log('error', error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <RegisterForm submitForm={handleSubmit} loading={isLoading} />
                {!matches && (
                    <div className={cx('register-image')}>
                        <img src={assets.images.registerImage} alt="Something wrong" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
