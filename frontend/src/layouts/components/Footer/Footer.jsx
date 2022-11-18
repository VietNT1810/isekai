import React from 'react';
import classNames from 'classnames/bind';
import { FacebookOutlined, Phone, Twitter, YouTube } from '@mui/icons-material';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer({ contact }) {
    return (
        <footer>
            {contact && (
                <div className={cx('wrapper')}>
                    <div className={cx('contact-info', 'block')}>
                        <h2>Contact Us</h2>
                        <small>Hỗ trợ khách hàng</small>
                        <div className={cx('social')}>
                            <FacebookOutlined className={cx('icon')} />
                            <Twitter className={cx('icon')} />
                            <YouTube className={cx('icon')} />
                            <Phone className={cx('icon')} />
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('shop-info', 'block')}>
                            <h3>Isekai</h3>
                            <small>94 Lương Yên</small>
                            <small>IsekaiShop@gmail.com</small>
                            <small>0976543210</small>
                        </div>
                        <div className={cx('policy', 'block')}>
                            <h3>Chính sách</h3>
                            <small>Chính sách đổi trả</small>
                            <small>Chính sách vận chuyển</small>
                            <small>Chính sách bảo mật</small>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('sub-footer', { contact })}>
                <div className={cx('container')}>
                    <span className={cx('copyright')}>© 2022 Isekai. All Rights Reserved.</span>
                    <div className={cx('tos')}>Terms of Service</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
