import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import * as userServices from '@/services/userService';
import styles from './ChangePassword.module.scss';
import ChangePasswordForm from './components/ChangePasswordForm';
import { openAlert } from '@/reducers/alertSlice';

const cx = classNames.bind(styles);

function ChangePassword(props) {
    const { userToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChangePassword = async (data) => {
        if (!data) return;
        await userServices
            .changePassword(data, userToken)
            .then((res) => {
                dispatch(openAlert({ message: res.message }));
            })
            .catch((err) => {
                dispatch(openAlert({ message: err.message, severity: 'error' }));
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>Đổi mật khẩu</h2>
                    <small>Để bảo mật mật khẩu, vui lòng không chia sẻ mật khẩu cho người khác</small>
                </div>
                <ChangePasswordForm submitForm={handleChangePassword} />
            </div>
        </div>
    );
}

export default ChangePassword;
