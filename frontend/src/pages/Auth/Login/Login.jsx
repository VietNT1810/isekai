import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Login.module.scss';
import LoginForm from './components/LoginForm';
import assets from '@/assets';
import { loginUser } from '@/actions/userAction';

const cx = classNames.bind(styles);

function Login(props) {
    const { loading, userInfo, error, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (data) => {
        data.email = data.email.toLowerCase();
        dispatch(loginUser(data));
    };

    return (
        <div className={cx('wrapper')}>
            {console.log('loginError', error)}
            <div className={cx('container')}>
                <LoginForm submitForm={handleSubmit} />
                <div className={cx('login-image')}>
                    <img src={assets.images.loginImage} alt="Something wrong" />
                </div>
            </div>
        </div>
    );
}

export default Login;
