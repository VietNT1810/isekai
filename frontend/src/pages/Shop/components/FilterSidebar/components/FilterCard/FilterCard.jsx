import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Slider } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import styles from './FilterCard.module.scss';
import { formatVND } from '@/helpers/number';
import { PRICE_MARKS, RATING_MARKS } from '@/constants';

const cx = classNames.bind(styles);

function valuetext(value) {
    return formatVND(value);
}

function FilterCard({ title, slider, ratingSlider }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceRange, setPriceRange] = useState([100000, 500000]);
    const [priceValue, setPriceValue] = useState([100000, 500000]);
    const [ratingValue, setRatingValue] = useState(0);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
        searchParams.set('rating', newValue);
        setSearchParams(searchParams);
    };
    const setVal = () => {
        setPriceValue(priceRange);
        let [min, max] = priceRange;
        searchParams.set('min', min);
        searchParams.set('max', max);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        setSearchParams({ min: priceValue[0], max: priceValue[1], rating: ratingValue });
    }, [priceValue, ratingValue]);

    return (
        <div className={cx('filter-card')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('filter')}>
                {slider && (
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={priceRange}
                        min={100000}
                        max={1000000}
                        step={100000}
                        marks={PRICE_MARKS}
                        onChange={handlePriceChange}
                        onChangeCommitted={setVal}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        valueLabelFormat={valuetext}
                    />
                )}
                {ratingSlider && (
                    <Slider
                        value={ratingValue}
                        step={1}
                        min={0}
                        max={5}
                        marks={RATING_MARKS}
                        onChange={handleRatingChange}
                        sx={{
                            '.MuiSlider-markLabel': {
                                fontSize: '12px',
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default FilterCard;
