import React from 'react';
import classNames from 'classnames/bind';

import styles from './SpecialLayout.module.scss';
import assets from '@/assets';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function SpecialLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('banner')}>
                <img src={assets.images.specialBanner} alt="Error banner image" />
            </div>
            {children}
        </>
    );
}

export default SpecialLayout;
