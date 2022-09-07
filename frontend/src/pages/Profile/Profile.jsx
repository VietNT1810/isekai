import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile(props) {
    const { loading, userInfo } = useSelector((state) => state.user);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('avatar')}></div>
                <div className={cx('user-info')}></div>
            </div>
        </div>
    );
}

export default Profile;
