import classNames from 'classnames/bind';
import SearchBar from './components/SearchBar';

import SortBar from './components/SortBar';
import styles from './ShopToolbar.module.scss';

const cx = classNames.bind(styles);

function ShopToolbar(props) {
    return (
        <div className={cx('shop-toolbar')}>
            <SearchBar />
            <SortBar />
        </div>
    );
}

export default ShopToolbar;
