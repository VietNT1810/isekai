import classNames from 'classnames/bind';

import images from '@/assets/images';
import Button from '@/components/Button';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home(props) {
    return (
        <main className={cx('wrapper')}>
            <section className={cx('banner')}>
                <div className={cx('inner')}>
                    <div className={cx('welcome')}>
                        <span>
                            Welcome to
                            <img src={images.logoWhite} alt="" />
                        </span>
                    </div>
                    <div className={cx('description')}>
                        <p>
                            Thương hiệu quần áo, phụ kiện đặc biệt dành cho những người yêu thích anime, manga, kết nối
                            cộng đồng Wibu
                        </p>
                    </div>
                    <Button contained to="/shop">Tìm hiểu thêm</Button>
                </div>
            </section>

            <section>
                
            </section>
        </main>
    );
}

export default Home;
