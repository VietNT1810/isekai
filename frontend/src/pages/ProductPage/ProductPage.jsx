import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './ProductPage.module.scss';
import * as productsService from '@/services/productsService';
import * as reviewsService from '@/services/reviewsService';
import ProductDetail from './components/ProductDetail';
import Review from './components/Review';
import ProductDetailSkeleton from '@/components/ProductDetailSkeleton/ProductDetailSkeleton';

const cx = classNames.bind(styles);

function ProductPage(props) {
    const params = useParams();
    const [product, setProducts] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const isInCart = useSelector((state) => {
        const carts = state.cart.carts;
        return carts.some((cart) => cart.productId._id == product._id);
    });

    //Call API
    const fetchProduct = async (signal) => {
        setLoading(true);
        await productsService
            .getProduct(params.slug, signal)
            .then((res) => {
                setLoading(false);
                setProducts(res.data.content[0]);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const fetchReviews = async (signal) => {
        setLoading(true);
        await reviewsService
            .getReviews(params.slug, signal)
            .then((res) => {
                setLoading(false);
                setReviews(res.data.content);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetchReviews(signal);
        fetchProduct(signal);

        //cleanup function
        return () => controller.abort();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {loading ? <ProductDetailSkeleton /> : <ProductDetail product={product} isInCart={isInCart} />}
                <Review product={product} reviews={reviews} />
            </div>
        </div>
    );
}

export default ProductPage;
