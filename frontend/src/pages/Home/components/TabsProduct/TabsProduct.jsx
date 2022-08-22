import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames/bind';

import styles from './TabsProduct.module.scss';

const cx = classNames.bind(styles);

function TabsProduct({ clothes, outfit, wig }) {
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
                <div className={cx('tab-content')}>
                    {clothes.map((item) => (
                        <div className={cx('tab-image')}>
                            <img src={item.productImage} alt="Error image :(" key={item._id} />
                        </div>
                    ))}
                </div>
                <div className={cx('tab-content')}>
                    {outfit.map((item) => (
                        <div className={cx('tab-image')}>
                            <img src={item.productImage} alt="Error image :(" key={item._id} />
                        </div>
                    ))}
                </div>
                <div className={cx('tab-content')}>
                    {wig.map((item) => (
                        <div className={cx('tab-image')}>
                            <img src={item.productImage} alt="Error image :(" key={item._id} />
                        </div>
                    ))}
                </div>
            </SwipeableViews>
        </>
    );
}

export default TabsProduct;
