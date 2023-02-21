import { useMediaQuery } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginByGoogle, registerUser } from '@/actions/userAction';
import assets from '@/assets';
import { openAlert } from '@/reducers/alertSlice';
import styles from './Register.module.scss';
import RegisterForm from './components/RegisterForm';

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
                dispatch(openAlert({ message: 'Tạo tài khoản thành công' }));
                location.state?.slug ? navigate(`/product/${location.state.slug}`) : navigate('/');
            })
            .catch((error) => {
                setIsLoading(false);
                dispatch(openAlert({ message: error, severity: 'error' }));
            });
    };

    const handleLoginWithGoogle = (token) => {
        dispatch(loginByGoogle({ token }))
            .unwrap()
            .then((res) => {
                location.state?.slug ? navigate(`/product/${location.state.slug}`) : navigate('/');
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <RegisterForm submitForm={handleSubmit} googleLogin={handleLoginWithGoogle} loading={isLoading} />
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
