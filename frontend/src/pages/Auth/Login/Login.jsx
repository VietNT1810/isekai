import { Alert, Snackbar, useMediaQuery } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginByGoogle, loginUser } from '@/actions/userAction';
import assets from '@/assets';
import LoginForm from './components/LoginForm';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login(props) {
    const matches = useMediaQuery('(max-width: 768px)');
    const [open, setOpen] = useState(false);
    const { loading, userInfo, error, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (data) => {
        data.email = data.email.toLowerCase();
        dispatch(loginUser(data))
            .unwrap()
            .then((res) => {
                setOpen(true);
                setTimeout(() => {
                    location.state?.slug ? navigate(`/product/${location.state.slug}`) : navigate('/');
                }, 2000);
            })
            .catch((error) => {
                console.log('error', error);
                setOpen(true);
            });
    };

    const handleLoginWithGoogle = (token) => {
        console.log('token login:', token);
        dispatch(loginByGoogle({ token }))
            .unwrap()
            .then((res) => {
                setOpen(true);
                setTimeout(() => {
                    location.state?.slug ? navigate(`/product/${location.state.slug}`) : navigate('/');
                }, 2000);
            })
            .catch((error) => {
                console.log('error', error);
                setOpen(true);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <LoginForm submitForm={handleSubmit} googleLogin={handleLoginWithGoogle} />
                {!matches && (
                    <div className={cx('login-image')}>
                        <img src={assets.images.loginImage} alt="Something wrong" />
                    </div>
                )}
            </div>
            <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    variant="filled"
                    severity={success ? 'success' : 'error'}
                    sx={{ width: '400px', fontSize: '14px', fontFamily: 'SVN Gotham Regular', alignItems: 'center' }}
                >
                    {success ? 'Đăng nhập thành công! Đang về trang chủ...' : error}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;
