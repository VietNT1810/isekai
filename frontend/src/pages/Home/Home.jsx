import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import Button from '@/components/Button';
import styles from './Home.module.scss';
import TabsProduct from './components/TabsProduct';
import * as productService from '@/services/productsService';
import { Divider } from '@mui/material';

const cx = classNames.bind(styles);

function Home(props) {
    const [tabClothes, setTabClothes] = useState([]);
    const [tabOutfit, setTabOutfit] = useState([]);
    const [tabWig, setTabWig] = useState([]);

    useEffect(() => {
        const getProducts = async (type) => {
            let params = {
                productType: type,
                limit: 3,
            };
            const result = await productService.getProducts(params);
            console.log('result', result);
            if (type === 'clothes') {
                setTabClothes(result.data.content);
            } else if (type === 'outfit') {
                setTabOutfit(result.data.content);
            } else if (type === 'wig') {
                setTabWig(result.data.content);
            }
        };
        getProducts('clothes');
        getProducts('outfit');
        getProducts('wig');
    }, []);

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
                    <Button contained to="/shop">
                        Tìm hiểu thêm
                    </Button>
                </div>
            </section>

            <section>
                <div className={cx('product', { block: 'block' })}>
                    <div className={cx('title')}>
                        <h1>Sản phẩm</h1>
                    </div>
                    <div className={cx('description')}>
                        <p>
                            Mỗi sản phẩm đều mang hơi thở anime manga và câu chuyện của riêng nó. Mang phong cách độc
                            đáo, năng động, phù hợp với nhiều lứa tuổi.
                        </p>
                    </div>
                    <div className={cx('tabs')}>
                        <TabsProduct clothes={tabClothes} outfit={tabOutfit} wig={tabWig} />
                    </div>
                </div>
            </section>

            <section className={cx('site-info')}>
                <div className={cx('container')}>
                    <div className={cx('inner')}>
                        <div className={cx('info')}>
                            <span className={cx('number')}>1200</span>
                            <div className={cx('title')}>Đơn hàng</div>
                        </div>
                        <div className={cx('info')}>
                            <span className={cx('number')}>387</span>
                            <div className={cx('title')}>Khách hàng</div>
                        </div>
                        <div className={cx('info')}>
                            <span className={cx('number')}>197</span>
                            <div className={cx('title')}>Bài viết</div>
                        </div>
                        <div className={cx('info')}>
                            <span className={cx('number')}>2570</span>
                            <div className={cx('title')}>Like</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('info-image')}>
                <img src={images.homeImage} alt="" />
            </section>

            <section className={cx('idea', { block: 'block' })}>
                <div className={cx('title')}>
                    <h1>Ý tưởng</h1>
                </div>
                <div className={cx('description')}>
                    <p>
                        Sản phẩm của chúng mình lấy ý tưởng từ thể loại "Chuyển sinh" (Isekai) trong Anime & Manga Nhật
                        Bản.
                    </p>
                </div>
            </section>

            <section className={cx('idea-poster')}>
                <div className={cx('poster')}>
                    <img src={images.homePoster01} alt="Error image :(" />
                </div>
                <div className={cx('poster')}>
                    <img src={images.homePoster02} alt="Error image :(" />
                </div>
                <div className={cx('poster')}>
                    <img src={images.homePoster03} alt="Error image :(" />
                </div>
                <div className={cx('poster')}>
                    <img src={images.homePoster04} alt="Error image :(" />
                </div>
            </section>

            <section className={cx('news', { block: 'block' })}>
                <div className={cx('title')}>
                    <h1>Bản tin Wibu</h1>
                </div>
                <div className={cx('description')}>
                    <p>
                        Tin tức mới nhất về các hoạt động, Festival, các sự kiện diễn ra trong cộng đồng "wibu" Việt Nam
                        và thế giới.
                    </p>
                </div>
                <div className="container">
                    <div className="news-box">
                        <div className="inner">
                            <div className="caption">
                                Một loạt lễ hội văn hóa nhật bản được sắp được tổ chức hàng loạt sau khi hết cách ly
                                COVID-19 được rất nhiều các cosplayer mong chờ
                            </div>
                            <Divider />
                            <div className="user">
                                <div className="avatar">
                                    <img src={images.homeAvatar01} alt="No image here :(" />
                                </div>
                                <div className="info">
                                    <p className="username">Someone</p>
                                    <span className="time">5 hour ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
