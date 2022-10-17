import { OutlinedInput } from '@mui/material';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './SearchBar.module.scss';
import { formatVND } from '@/helpers/number';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const products = [
    {
        productImage: 'https://res.cloudinary.com/supafrankie/image/upload/v1661155393/clothes/CC-800x800_vdoopr.png',
        name: 'Set bộ đồ nữ chữ N , áo polo khóa kèm quần short đùi thêu form rộng unisex',
        price: 600000,
        slug: 'product-6-94957ca438',
    },
    {
        productImage: 'https://res.cloudinary.com/supafrankie/image/upload/v1660884311/sample.jpg',
        name: 'product 2',
        price: 600000,
        slug: 'product-6-94957ca438',
    },
    {
        productImage: 'https://res.cloudinary.com/supafrankie/image/upload/v1661155393/clothes/CC-800x800_vdoopr.png',
        name: 'product 3',
        price: 600000,
        slug: 'product-6-94957ca438',
    },
];

function SearchBar(props) {
    return (
        <div className={cx('search-bar')}>
            <OutlinedInput placeholder="Search product" sx={{ fontSize: 16, height: 40 }} />
            <div className={cx('search-result')}>
                {products.map((result, index) => (
                    <NavLink key={index} className={cx('search-item')} to={`/product/${result.slug}`}>
                        <div className={cx('result-image-container')}>
                            <div className={cx('result-image-box')}>
                                <img src={result.productImage} className={cx('result-image')} alt="Error image" />
                            </div>
                        </div>
                        <div className={cx('result-info')}>
                            <div className={cx('name')}>{result.name}</div>
                            <span className={cx('price')}>{formatVND(result.price)}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;
