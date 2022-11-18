import React from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './FilterSidebar.module.scss';
import FilterCard from './components/FilterCard';

const cx = classNames.bind(styles);

function FilterSidebar(props) {
    return (
        <div className={cx('filter-sidebar')}>
            <FilterCard title="Lọc theo giá" slider />
            <FilterCard title="Lọc theo đánh giá" ratingSlider />
        </div>
    );
}

export default FilterSidebar;
