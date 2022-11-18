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
            <span className={cx('title')}>Sắp xếp</span>
            <div className={cx('select-box')}>
                <FormControl sx={{ minWidth: 200 }}>
                    <Select value={sortOrder} onChange={handleSortChange} sx={{ fontSize: 16, height: 40 }}>
                        <MenuItem value="newest" sx={{ fontSize: 16 }}>
                            Mới nhất
                        </MenuItem>
                        <MenuItem value="ASC" sx={{ fontSize: 16 }}>
                            Giá tăng dần
                        </MenuItem>
                        <MenuItem value="DESC" sx={{ fontSize: 16 }}>
                            Giá giảm dần
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default SortBar;
