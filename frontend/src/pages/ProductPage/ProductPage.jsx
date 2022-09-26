import { Rating } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import assets from '@/assets';
import Button from '@/components/Button';
import { formatVND } from '@/helpers/number';
import * as productsService from '@/services/productsService';
import { Add, AddShoppingCart, Remove } from '@mui/icons-material';
import styles from './ProductPage.module.scss';

const cx = classNames.bind(styles);

function ProductPage(props) {
    const params = useParams();
    const [product, setProducts] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            await productsService
                .getProduct(params.slug)
                .then((res) => {
                    setProducts(res.data.content);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchProduct();
    }, []);
    console.log(product);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('product')}>
                    <div className={cx('product-image-container')}>
                        <div className={cx('product-image-box')}>
                            <img src={product.productImage} className={cx('product-image')} alt="Error image" />
                        </div>
                    </div>
                    <div className={cx('product-info')}>
                        <span className={cx('product-name')}>{product.name}</span>
                        <div className={cx('product-group')}>
                            <p className={cx('label')}>Đánh giá:</p>
                            <Rating
                                className={cx('rating')}
                                name="read-only"
                                defaultValue={product.rating || 0}
                                size="large"
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: '#04c4d9',
                                    },
                                }}
                                readOnly
                            />
                        </div>

                        <div className={cx('product-group')}>
                            <p className={cx('label')}>Giá:</p>
                            <span className={cx('price')}>{formatVND(product.price)}</span>
                        </div>

                        <div className={cx('product-group')}>
                            <p className={cx('label')}>Số lượng:</p>
                            <div className={cx('quantity')}>
                                <div className={cx('cart-quantity')}>
                                    <button>
                                        <Remove />
                                    </button>
                                    <input
                                        type="text"
                                        value="1"
                                        onChange={() => {
                                            console.log();
                                        }}
                                    />
                                    <button>
                                        <Add />
                                    </button>
                                </div>
                                <span>{product.quantity} sản phẩm có sẵn</span>
                            </div>
                        </div>

                        <div className={cx('product-group')}>
                            <p className={cx('label')}>Vận chuyển:</p>
                            <h1 className={cx('shipping')}>
                                <img src={assets.icons.iconShipping} alt="Error icon" />
                                <span>Miễn phí vận chuyển</span>
                            </h1>
                        </div>

                        <div className={cx('product-action')}>
                            <Button outline leftIcon={<AddShoppingCart color="primary" sx={{ fontSize: '24px' }} />}>
                                Thêm vào giỏ hàng
                            </Button>
                            <Button primary>Mua ngay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
