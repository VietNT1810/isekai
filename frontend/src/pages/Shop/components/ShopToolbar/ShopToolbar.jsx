import React from 'react';
import classNames from 'classnames/bind';

import styles from './ShopToolbar.module.scss';
import InputField from '@/components/InputField';
import { FormControl, InputBase, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ShopToolbar(props) {
    const [sortBy, setSortBy] = useState('newest');

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <div className={cx('shop-toolbar')}>
            <div className={cx('search-bar')}>
                <OutlinedInput placeholder="Search product" sx={{ fontSize: 16, height: 40 }} />
            </div>
            <div className={cx('sort-bar')}>
                <div className={cx('title')}>Sort by</div>
                <div className={cx('select-box')}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <Select
                            value={sortBy}
                            onChange={handleSortChange}
                            displayEmpty
                            sx={{ fontSize: 16, height: 40 }}
                        >
                            <MenuItem value="newest" sx={{ fontSize: 16 }}>
                                Newest First
                            </MenuItem>
                            <MenuItem value="low" sx={{ fontSize: 16 }}>
                                Price Low to High
                            </MenuItem>
                            <MenuItem value="high" sx={{ fontSize: 16 }}>
                                Price High to Low
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default ShopToolbar;
