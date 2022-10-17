import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Slider } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './FilterCard.module.scss';
import { formatVND } from '@/helpers/number';
import { PRICE_MARKS, RATING_MARKS } from '@/constants';
import { filterPrice, filterRating } from '@/pages/Shop/shopSlice';

const cx = classNames.bind(styles);

function valuetext(value) {
    return formatVND(value);
}

function FilterCard({ title, slider, ratingSlider }) {
    const { filterQuery } = useSelector((state) => state.shop);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const [priceRange, setPriceRange] = useState([100000, 500000]);
    const [priceValue, setPriceValue] = useState([100000, 500000]);

    const [ratingRange, setRatingRange] = useState(0);
    const [ratingValue, setRatingValue] = useState(0);

    //price change
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleSetPriceValue = () => {
        setPriceValue(priceRange);

        //dispatch action
        dispatch(filterPrice(priceRange));
    };

    //rating change
    const handleRatingChange = (event, newValue) => {
        setRatingRange(newValue);
    };

    const handleSetRatingValue = () => {
        setRatingValue(ratingRange);

        //dispatch action
        dispatch(filterRating(ratingRange));
    };

    useEffect(() => {
        setPriceRange([filterQuery.min, filterQuery.max]);
        setRatingRange(filterQuery.rating);
    }, []);

    return (
        <div className={cx('filter-card')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('filter')}>
                {slider && (
                    <Slider
                        value={priceRange}
                        defaultValue={[100000, 500000]}
                        min={100000}
                        max={1000000}
                        step={100000}
                        marks={PRICE_MARKS}
                        onChange={handlePriceChange}
                        onChangeCommitted={handleSetPriceValue}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        valueLabelFormat={valuetext}
                    />
                )}
                {ratingSlider && (
                    <Slider
                        value={ratingRange}
                        defaultValue={0}
                        step={1}
                        min={0}
                        max={5}
                        marks={RATING_MARKS}
                        onChange={handleRatingChange}
                        onChangeCommitted={handleSetRatingValue}
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
