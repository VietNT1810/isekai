import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

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
            <Tabs
                value={index}
                onChange={handleChange}
                className={cx('tabs')}
                textColor="inherit"
                TabIndicatorProps={{ style: { background: '#04C4D9' } }}
            >
                <Tab className={cx('title')} label="Quần áo" />
                <Tab className={cx('title')} label="Trang phục" />
                <Tab className={cx('title')} label="Wig" />
            </Tabs>
            <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                <div className={cx('tab-content')}>
                    {clothes?.map((item) => (
                        <Link className={cx('tab-image')} key={item._id} to={`/product/${item.slug}`}>
                            <img src={item.productImage} alt="Error image :(" />
                        </Link>
                    ))}
                </div>
                <div className={cx('tab-content')}>
                    {outfit?.map((item) => (
                        <div className={cx('tab-image')} key={item._id}>
                            <img src={item.productImage} alt="Error image :(" />
                        </div>
                    ))}
                </div>
                <div className={cx('tab-content')}>
                    {wig?.map((item) => (
                        <div className={cx('tab-image')} key={item._id}>
                            <img src={item.productImage} alt="Error image :(" />
                        </div>
                    ))}
                </div>
            </SwipeableViews>
        </>
    );
}

export default TabsProduct;
