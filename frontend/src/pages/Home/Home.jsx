import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import assets from '@/assets';
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
                            <img src={assets.images.logoWhite} alt="" />
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
                <div className={cx('product', 'block')}>
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
                <img src={assets.images.homeImage} alt="" />
            </section>

            <section className={cx('idea', 'block')}>
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
                    <img src={assets.images.homePoster01} alt="Error image :(" />
                </div>
                <div className={cx('poster')}>
                    <img src={assets.images.homePoster02} alt="Error image :(" />
                </div>
                <div className={cx('poster')}>
                    <img src={assets.images.homePoster03} alt="Error image :(" />
                </div>
                <div className={cx('poster')}>
                    <img src={assets.images.homePoster04} alt="Error image :(" />
                </div>
            </section>

            <section className={cx('news', 'block')}>
                <div className={cx('title')}>
                    <h1>Bản tin Wibu</h1>
                </div>
                <div className={cx('description')}>
                    <p>
                        Tin tức mới nhất về các hoạt động, Festival, các sự kiện diễn ra trong cộng đồng "wibu" Việt Nam
                        và thế giới.
                    </p>
                </div>
                <div className={cx('news-box')}>
                    <div className={cx('inner')}>
                        <div className={cx('caption')}>
                            Một loạt lễ hội văn hóa nhật bản được sắp được tổ chức hàng loạt sau khi hết cách ly
                            COVID-19 được rất nhiều các cosplayer mong chờ
                        </div>
                        <Divider />
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <img src={assets.images.homeAvatar01} alt="No image here :(" />
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('username')}>Someone</p>
                                <span className={cx('time')}>5 hour ago</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('inner')}>
                        <div className={cx('caption')}>
                            Một thanh niên người Trung Quốc sinh sống ở Vũ Hán đã đăng lên mạng một đoạn phim chứng minh
                            mình có thể thi triển hơi thở của nước (Kimetsu no Yaiba) bằng cách lắp vòi nước vào thanh
                            kiếm katana tự chế của mình.
                        </div>
                        <Divider />
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <img src={assets.images.homeAvatar02} alt="No image here :(" />
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('username')}>Someone</p>
                                <span className={cx('time')}>5 hour ago</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('inner')}>
                        <div className={cx('caption')}>
                            Cuộc thi Nhật phục 2021: Mahou no Kontesuto là cuộc thi giải trí do FJC - CLB tiếng Nhật
                            trường Đại học Ngoại thương cơ sở II tổ chức với hình thức low - cost cosplay sẽ chính thức
                            khai mạc vào ngày 12/9/2021 với thể thức 2 vòng thi.
                        </div>
                        <Divider />
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <img src={assets.images.homeAvatar03} alt="No image here :(" />
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('username')}>Someone</p>
                                <span className={cx('time')}>5 hour ago</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Button primary>Xem thêm</Button>
            </section>
        </main>
    );
}

export default Home;
