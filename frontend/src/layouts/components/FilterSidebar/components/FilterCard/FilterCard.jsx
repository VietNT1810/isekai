import React from 'react';
import classNames from 'classnames/bind';

import styles from './FilterCard.module.scss';
import { Slider } from '@mui/material';

const cx = classNames.bind(styles);
function valuetext(value) {
    return `${value}đ`;
}

function FilterCard({ title }) {
    const [value, setValue] = React.useState([100000, 1000000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={cx('filter-card')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('slider')}>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                />
            </div>
        </div>
    );
}

export default FilterCard;
