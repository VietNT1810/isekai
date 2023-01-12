import Footer from '@/layouts/components/Footer';
import classNames from 'classnames/bind';
import React from 'react';

import styles from './Checkout.module.scss';

const cx = classNames.bind(styles);

function Checkout(props) {
    return (
        <div className={cx('one-page')}>
            <header>
                <div className={cx('container')}></div>
            </header>
            <main></main>
            <Footer />
        </div>
    );
}

export default Checkout;
