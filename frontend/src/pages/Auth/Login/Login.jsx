import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Login.module.scss';
import LoginForm from './components/LoginForm';
import assets from '@/assets';
import { loginUser } from '@/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Login(props) {
    const [open, setOpen] = useState(false);
    const { loading, userInfo, error, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        data.email = data.email.toLowerCase();
        dispatch(loginUser(data))
            .unwrap()
            .then(() => {
                setOpen(true);
                setTimeout(() => {
                    navigate('/');
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
                <LoginForm submitForm={handleSubmit} />
                <div className={cx('login-image')}>
                    <img src={assets.images.loginImage} alt="Something wrong" />
                </div>
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
