import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import styles from './PaymentMethod.module.scss';
import { PAYMENT_METHOD } from '@/constants';

const cx = classNames.bind(styles);

function PaymentMethod({ handleSelect }) {
    const [method, setMethod] = useState('cod');

    useEffect(() => {
        handleSelect(method);
    }, [method]);

    const handleChange = (e) => {
        setMethod(e.target.value);
    };

    return (
        <div className={cx('payment-method')}>
            {PAYMENT_METHOD.map((elm, index) => (
                <div key={index} className={cx('method')}>
                    <input
                        type="radio"
                        name="payment-method"
                        id={elm.value}
                        value={elm.value}
                        defaultChecked={index === 0}
                        onChange={handleChange}
                    />
                    <label htmlFor={elm.value} className={cx('method-label')}>
                        <img src={elm.icon} alt="icon error" />
                        <span className={cx('title')}>{elm.title}</span>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default PaymentMethod;
