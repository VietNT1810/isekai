import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import LoginForm from './components/LoginForm';
import assets from '@/assets';

const cx = classNames.bind(styles);

function Login(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <LoginForm />
                <div className={cx('login-image')}>
                    <img src={assets.images.loginImage} alt="Something wrong" />
                </div>
            </div>
        </div>
    );
}

export default Login;
