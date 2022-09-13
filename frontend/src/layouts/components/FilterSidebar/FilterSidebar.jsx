import React from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './FilterSidebar.module.scss';
import FilterCard from './components/FilterCard';

const cx = classNames.bind(styles);

function FilterSidebar(props) {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className={cx('filter-sidebar')}>
            <FilterCard title="Price" />
            <FilterCard title="Rating" />
        </div>
    );
}

export default FilterSidebar;
