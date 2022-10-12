import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './ProductPage.module.scss';
import * as productsService from '@/services/productsService';
import * as reviewsService from '@/services/reviewsService';
import ProductDetail from './components/ProductDetail';
import Review from './components/Review';

const cx = classNames.bind(styles);

function ProductPage(props) {
    const params = useParams();
    const [product, setProducts] = useState({});
    const [reviews, setReviews] = useState([]);

    const isInCart = useSelector((state) => {
        const carts = state.cart.carts;
        return carts.some((cart) => cart.productId._id == product._id);
    });

    //Call API
    const fetchProduct = async () => {
        await productsService
            .getProduct(params.slug)
            .then((res) => {
                setProducts(res.data.content[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchReviews = async () => {
        await reviewsService
            .getReviews(params.slug)
            .then((res) => {
                setReviews(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchReviews();
        fetchProduct();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ProductDetail product={product} isInCart={isInCart} />
                <Review product={product} reviews={reviews} />
            </div>
        </div>
    );
}

export default ProductPage;
