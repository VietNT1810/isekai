import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, children, primary, outline, contained, onClick, ...passProps }) {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    let classes = cx('wrapper', {
        primary,
        outline,
        contained,
    });

    return (
        <Component className={classes} {...props}>
            <span className={cx('title')}>{children}</span>
        </Component>
    );
}

export default Button;
