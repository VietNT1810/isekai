import { Close } from '@mui/icons-material';
import { Fab } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './AuthLayout.module.scss';

const cx = classNames.bind(styles);

function AuthLayout() {
    const [isLoginPage, setIsLoginPage] = useState(false);
    const navigate = useNavigate();

    let location = useLocation();

    useEffect(() => {
        //Check login route
        setIsLoginPage(location.pathname.includes('login'));
    }, [location.pathname]);

    return (
        <div className={cx('wrapper')}>
            <Fab
                className={cx('close', { login: isLoginPage })}
                onClick={() => {
                    navigate(-1);
                }}
            >
                <Close className={cx('close-icon')} fontSize="large" />
            </Fab>
            <Outlet />
        </div>
    );
}

export default AuthLayout;
