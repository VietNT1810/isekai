import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import Button from '@/components/Button';
import styles from './Home.module.scss';
import TabsProduct from './components/TabsProduct';
import * as productService from '@/services/productsService';

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
        </main>
    );
}

export default Home;
