import { Alert, Snackbar, useMediaQuery } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginByGoogle, loginUser } from '@/actions/userAction';
import assets from '@/assets';
import LoginForm from './components/LoginForm';
import styles from './Login.module.scss';
import { openAlert } from '@/reducers/alertSlice';

const cx = classNames.bind(styles);

function Login(props) {
    const matches = useMediaQuery('(max-width: 768px)');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo, error, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (data) => {
        data.email = data.email.toLowerCase();
        setIsLoading(true);
        dispatch(loginUser(data))
            .unwrap()
            .then((res) => {
                dispatch(openAlert({ message: 'Đăng nhập thành công', severity: 'success' }));
                setTimeout(() => {
                    setIsLoading(false);
                    location.state?.slug ? navigate(`/product/${location.state.slug}`) : navigate('/');
                }, 2000);
            })
            .catch((error) => {
                dispatch(openAlert({ message: error, severity: 'error' }));
                setIsLoading(false);
            });
    };

    const handleLoginWithGoogle = (token) => {
        dispatch(loginByGoogle({ token }))
            .unwrap()
            .then((res) => {
                dispatch(openAlert({ message: 'Đăng nhập thành công', severity: 'success' }));
                setTimeout(() => {
                    location.state?.slug ? navigate(`/product/${location.state.slug}`) : navigate('/');
                }, 2000);
            })
            .catch((error) => {
                dispatch(openAlert({ message: 'Đăng nhập thất bại', severity: 'error' }));
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <LoginForm submitForm={handleSubmit} googleLogin={handleLoginWithGoogle} loading={isLoading} />
                {!matches && (
                    <div className={cx('login-image')}>
                        <img src={assets.images.loginImage} alt="Something wrong" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
