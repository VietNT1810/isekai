import classNames from 'classnames/bind';

import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

function NotFound(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <h1>Ôi không... 🤦🏼‍♀️</h1>
                <p>Trang bạn đang tìm kiếm có thể đã bị di chuyển, bị xóa hoặc có thể chưa từng tồn tại.</p>
            </div>
            <span>404</span>
        </div>
    );
}

export default NotFound;
