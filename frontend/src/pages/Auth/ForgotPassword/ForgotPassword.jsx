import React from 'react';
import classNames from 'classnames/bind';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import styles from './ForgotPassword.module.scss';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import assets from '@/assets';

const cx = classNames.bind(styles);
const schema = yup
    .object({
        email: yup.string().email('Invalid email address').required('Email is required'),
    })
    .required();

function ForgotPassword(props) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form className={cx('forgot-form')} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={cx('title')}>Quên mật khẩu</h1>
                    <p className={cx('description')}>
                        Bạn không may quên mất mật khẩu tài khoản của mình? Không sao! Hãy nhập email mà bạn cần lấy lại
                        mật khẩu và chúng mình sẽ gửi mã xác nhận cho bạn.
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
                    />
                    <Button action type="submit">
                        Gửi mã
                    </Button>
                </form>
                <div className={cx('forgot-image')}>
                    <img src={assets.images.loginImage} alt="Something wrong" />
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
