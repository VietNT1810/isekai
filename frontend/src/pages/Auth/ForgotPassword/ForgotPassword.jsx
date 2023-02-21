import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import assets from '@/assets';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import * as userService from '@/services/userService';
import styles from './ForgotPassword.module.scss';
import { openAlert } from '@/reducers/alertSlice';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';

const cx = classNames.bind(styles);
const schema = yup
    .object({
        email: yup.string().email('Địa chỉ email không hợp lệ').required('Nhập địa chỉ email'),
    })
    .required();

function ForgotPassword(props) {
    const dispatch = useDispatch();
    const [isSuccess, setIsSuccess] = useState(false);
    const mobile = useMediaQuery('(max-width: 1024px)');

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (email) => {
        if (!email) return;
        await userService
            .forgotPassword(email)
            .then((res) => {
                dispatch(openAlert({ message: res.message }));
                setIsSuccess(true);
            })
            .catch((err) => {
                dispatch(openAlert({ message: err.data.message, severity: 'error' }));
                setIsSuccess(false);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form className={cx('forgot-form')} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={cx('title')}>Quên mật khẩu</h1>
                    <p className={cx('description')}>
                        Bạn không may quên mất mật khẩu tài khoản của mình? Không sao! Hãy nhập email mà bạn cần lấy lại
                        mật khẩu và chúng mình sẽ gửi xác nhận cho bạn.
                    </p>
                    <InputField
                        variant="filled"
                        id="email"
                        label="Email"
                        name="email"
                        fullWidth
                        register={register}
                        required
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        disabled={isSuccess}
                    />
                    <Button action type="submit" loading={isSuccess}>
                        Gửi mã
                    </Button>
                </form>
                {!mobile && (
                    <div className={cx('forgot-image')}>
                        <img src={assets.images.forgotImage} alt="Something wrong" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
