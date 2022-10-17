import { FormControl, MenuItem, Select } from '@mui/material';
import classNames from 'classnames/bind';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './SortBar.module.scss';
import { changeSort } from '@/pages/Shop/shopSlice';

const cx = classNames.bind(styles);

function SortBar(props) {
    const { sortOrder } = useSelector((state) => state.shop);
    const dispatch = useDispatch();

    const handleSortChange = (e) => {
        dispatch(changeSort(e.target.value));
    };

    return (
        <div className={cx('sort-bar')}>
            <div className={cx('title')}>Sort by</div>
            <div className={cx('select-box')}>
                <FormControl sx={{ minWidth: 200 }}>
                    <Select value={sortOrder} onChange={handleSortChange} sx={{ fontSize: 16, height: 40 }}>
                        <MenuItem value="newest" sx={{ fontSize: 16 }}>
                            Newest First
                        </MenuItem>
                        <MenuItem value="ASC" sx={{ fontSize: 16 }}>
                            Price Low to High
                        </MenuItem>
                        <MenuItem value="DESC" sx={{ fontSize: 16 }}>
                            Price High to Low
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default SortBar;
