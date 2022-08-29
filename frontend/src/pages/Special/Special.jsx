import React from 'react';
import classNames from 'classnames/bind';

import styles from './Special.module.scss';
import assets from '@/assets';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function Special() {
    return (
        <main className={cx('wrapper')}>
            <section className={cx('banner')}>
                <img src={assets.images.specialBanner} alt="Error banner image" />
            </section>

            <section className={cx('content')}>
                <div className={cx('container')}>
                    <div className={cx('block')}>
                        <div className={cx('inner')}>
                            <div className={cx('image')}>
                                <img src={assets.images.specialCard01} alt="" />
                                <div className={cx('image-border')}>
                                    <img src={assets.images.logoWhite} alt="" />
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title')}>Vũ khí</div>
                                <p className={cx('description')}>
                                    Hơn 500 sản phẩm từ hơn 100 bộ anime, manga hot nhất!
                                </p>
                            </div>
                        </div>
                        <Button special>Xem thêm</Button>
                    </div>
                    <div className={cx('block')}>
                        <div className={cx('inner')}>
                            <div className={cx('image')}>
                                <img src={assets.images.specialCard02} alt="" />
                                <div className={cx('image-border')}>
                                    <img src={assets.images.logoWhite} alt="" />
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title')}>Wigs</div>
                                <p className={cx('description')}>
                                    100+ mẫu tóc giả chất lượng của các nhân vật nổi tiếng!
                                </p>
                            </div>
                        </div>
                        <Button special>Xem thêm</Button>
                    </div>
                    <div className={cx('block')}>
                        <div className={cx('inner')}>
                            <div className={cx('image')}>
                                <img src={assets.images.specialCard03} alt="" />
                                <div className={cx('image-border')}>
                                    <img src={assets.images.logoWhite} alt="" />
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title')}>Trang phục</div>
                                <p className={cx('description')}>
                                    Hàng trăm trang phục hóa thân thành nhân vật bạn yêu thích!
                                </p>
                            </div>
                        </div>
                        <Button special>Xem thêm</Button>
                    </div>
                    <div className={cx('block')}>
                        <div className={cx('inner')}>
                            <div className={cx('image')}>
                                <img src={assets.images.specialCard04} alt="" />
                                <div className={cx('image-border')}>
                                    <img src={assets.images.logoWhite} alt="" />
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title')}>Lolita</div>
                                <p className={cx('description')}>
                                    Gothic Lolita, Sweet Lolita, Punk Lolita, Old school Lolita.
                                </p>
                            </div>
                        </div>
                        <Button special>Xem thêm</Button>
                    </div>
                    <div className={cx('block')}>
                        <div className={cx('inner')}>
                            <div className={cx('image')}>
                                <img src={assets.images.specialCard05} alt="" />
                                <div className={cx('image-border')}>
                                    <img src={assets.images.logoWhite} alt="" />
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title')}>Phụ kiện</div>
                                <p className={cx('description')}>
                                    Phụ kiện đi kèm trang phục nhân vật, chi tiết, tỉ mỉ.
                                </p>
                            </div>
                        </div>
                        <Button special>Xem thêm</Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Special;
