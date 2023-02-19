import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { OutlinedInput } from '@mui/material';
import classNames from 'classnames/bind';

import { formatVND } from '@/helpers/number';
import useDebounce from '@/hooks/useDebounce';
import styles from './SearchBar.module.scss';
import * as productsService from '@/services/productsService';

const cx = classNames.bind(styles);

function SearchBar(props) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            const result = await productsService.searchProduct(debouncedValue);
            setSearchResult(result.products);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className={cx('search-bar')}>
            <OutlinedInput
                placeholder="Tìm sản phẩm"
                sx={{ fontSize: 16, height: 40 }}
                onChange={handleSearchChange}
                ref={inputRef}
                onFocus={() => {
                    setShowResult(true);
                }}
                onBlur={handleHideResult}
            />
            {showResult && searchResult.length > 0 ? (
                <div className={cx('search-result')}>
                    {searchResult.map((result, index) => (
                        <Link key={index} className={cx('search-item')} to={`/product/${result.slug}`}>
                            <div className={cx('result-image-container')}>
                                <div className={cx('result-image-box')}>
                                    <img src={result.productImage} className={cx('result-image')} alt="Error image" />
                                </div>
                            </div>
                            <div className={cx('result-info')}>
                                <div className={cx('name')}>{result.name}</div>
                                <span className={cx('price')}>{formatVND(result.price)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default SearchBar;
