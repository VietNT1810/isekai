import { Close } from '@mui/icons-material';
import { Fab } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './AuthLayout.module.scss';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    const [isLoginPage, setIsLoginPage] = useState(false);
    const navigate = useNavigate();

    let location = useLocation();

    useEffect(() => {
        //Check login route
        setIsLoginPage(location.pathname === '/login');
    }, [location.pathname]);

    return (
        <div className={cx('wrapper')}>
            <Fab
                className={cx('close', { login: isLoginPage })}
                onClick={() => {
                    navigate('/');
                }}
            >
                <Close className={cx('close-icon')} fontSize="large" />
            </Fab>
            {children}
        </div>
    );
}

export default AuthLayout;
