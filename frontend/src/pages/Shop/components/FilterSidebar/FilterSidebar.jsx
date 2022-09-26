import React from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './FilterSidebar.module.scss';
import FilterCard from './components/FilterCard';

const cx = classNames.bind(styles);

function FilterSidebar(props) {
    return (
        <div className={cx('filter-sidebar')}>
            <FilterCard title="Filter by Price" slider />
            <FilterCard title="Filter by Rating" ratingSlider />
        </div>
    );
}

export default FilterSidebar;
