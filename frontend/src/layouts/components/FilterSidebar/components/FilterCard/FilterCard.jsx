import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Rating, Slider } from '@mui/material';

import styles from './FilterCard.module.scss';
import { formatVND } from '@/helpers/number';

const cx = classNames.bind(styles);

const priceMarks = [
    { value: 100000, label: formatVND(100000) },
    { value: 1000000, label: formatVND(1000000) },
];

const ratingMarks = [
    { value: 0, label: 'Any' },
    { value: 5, label: '5' },
];

function valuetext(value) {
    return formatVND(value);
}

function FilterCard({ title, slider, ratingSlider }) {
    const [priceRange, setPriceRange] = useState([100000, 500000]);
    const [value, setValue] = useState([100000, 500000]);
    const [ratingValue, setRatingValue] = useState(3);

    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };
    const setVal = () => {
        setValue(priceRange);
    };

    useEffect(() => {
        let price = {
            min: value[0],
            max: value[1],
        };
        let rating = ratingValue;
        console.log('price:', price);
        console.log('rating:', rating);
    }, [value, ratingValue]);

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
                        marks={priceMarks}
                        onChange={handleChange}
                        onChangeCommitted={setVal}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        valueLabelFormat={valuetext}
                    />
                )}
                {ratingSlider && (
                    <Rating
                        name="simple-controlled"
                        value={ratingValue}
                        onChange={handleRatingChange}
                        size="large"
                        color="primary"
                        sx={{
                            fontSize: '4rem',
                            '& .MuiRating-iconFilled': {
                                color: '#04c4d9',
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default FilterCard;
