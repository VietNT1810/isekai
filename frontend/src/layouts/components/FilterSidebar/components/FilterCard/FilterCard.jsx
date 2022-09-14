import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Slider } from '@mui/material';

import styles from './FilterCard.module.scss';
import { formatVND } from '@/helpers/number';

const cx = classNames.bind(styles);

const marks = [
    { value: 100000, label: formatVND(100000) },
    { value: 1000000, label: formatVND(1000000) },
];

function valuetext(value) {
    return formatVND(value);
}

function FilterCard({ title, slider, rating }) {
    const [range, setRange] = useState([100000, 500000]);
    const [value, setValue] = useState([100000, 500000]);

    const handleChange = (event, newValue) => {
        setRange(newValue);
    };

    const setVal = () => {
        setValue(range);
    };

    useEffect(() => {
        let price = {
            min: value[0],
            max: value[1],
        };
        console.log('price:', price);
    }, [value]);

    return (
        <div className={cx('filter-card')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('filter')}>
                {slider && (
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={range}
                        min={100000}
                        max={1000000}
                        step={100000}
                        marks={marks}
                        onChange={handleChange}
                        onChangeCommitted={setVal}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        valueLabelFormat={valuetext}
                    />
                )}
            </div>
        </div>
    );
}

export default FilterCard;
