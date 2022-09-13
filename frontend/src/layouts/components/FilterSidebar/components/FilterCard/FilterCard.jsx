import React from 'react';
import classNames from 'classnames/bind';

import styles from './FilterCard.module.scss';
import { Slider } from '@mui/material';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function valuetext(value) {
    return `${value}đ`;
}

function FilterCard({ title }) {
    const [range, setRange] = React.useState([100000, 500000]);
    const [value, setValue] = React.useState([100000, 500000]);

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
            <h1>{value}</h1>
            <div className={cx('title')}>{title}</div>
            <div className={cx('slider')}>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={range}
                    min={100000}
                    max={1000000}
                    onChange={handleChange}
                    onChangeCommitted={setVal}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                />
            </div>
        </div>
    );
}

export default FilterCard;
