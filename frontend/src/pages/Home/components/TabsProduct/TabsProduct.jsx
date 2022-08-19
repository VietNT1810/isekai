import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames/bind';

import styles from './TabsProduct.module.scss';

const cx = classNames.bind(styles);

function TabsProduct(props) {
    const [index, setIndex] = useState(0);

    const handleChange = (event, value) => {
        setIndex(value);
    };

    const handleChangeIndex = (index) => {
        setIndex(index);
    };

    return (
        <>
            <Tabs value={index} onChange={handleChange} className={cx('tabs')} textColor="inherit">
                <Tab className={cx('title')} label="Quần áo" />
                <Tab className={cx('title')} label="Trang phục" />
                <Tab className={cx('title')} label="Wig" />
            </Tabs>
            <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                <div className={cx('tab-content')}>slide n°1</div>
                <div className={cx('tab-content')}>slide n°2</div>
                <div className={cx('tab-content')}>slide n°3</div>
            </SwipeableViews>
        </>
    );
}

export default TabsProduct;
