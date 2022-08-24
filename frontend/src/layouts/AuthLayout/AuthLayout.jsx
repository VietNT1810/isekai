import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Fab } from '@mui/material';
import { Close } from '@mui/icons-material';

import styles from './AuthLayout.module.scss';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    const [isLoginPage, setIsLoginPage] = useState(false);

    let location = useLocation();
    console.log('location', location);

    useEffect(() => {
        //Check login route
        if (location.pathname == '/login') {
            setIsLoginPage(true);
        } else {
            setIsLoginPage(false);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Fab className={cx('close', { login: isLoginPage })}>
                <Close />
            </Fab>
            {children}
        </div>
    );
}

export default AuthLayout;
