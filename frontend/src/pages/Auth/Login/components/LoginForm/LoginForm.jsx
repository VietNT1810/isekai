import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import CheckboxField from '@/components/CheckboxField';
import InputField from '@/components/InputField';
import styles from './LoginForm.module.scss';
import Button from '@/components/Button';
import GoogleAuthButton from '@/components/GoogleAuthButton';

const cx = classNames.bind(styles);
const schema = yup
    .object({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
    })
    .required();

function LoginForm({ submitForm, googleLogin }) {
    const location = useLocation();

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <div className={cx('login-form')}>
            <h1 className={cx('title')}>Đăng nhập</h1>
            <small>
                Người mới?
                <Link to="/register" state={{ slug: location.state?.slug }}>
                    Tạo tài khoản ở đây
                </Link>
            </small>
            <form
                onSubmit={handleSubmit((data) => {
                    submitForm(data);
                })}
            >
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
                <InputField
                    variant="filled"
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    fullWidth
                    register={register}
                    autoComplete="on"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                />
                <small>
                    <Link to="/login/identify">Quên mật khẩu ?</Link>
                </small>
                <Controller
                    name="remember"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => <CheckboxField label="Giữ tôi luôn đăng nhập" field={field} />}
                />
                <Button action type="submit">
                    Đăng nhập
                </Button>
            </form>
            <div className={cx('login-choice')}>
                <span></span>
                <p>Hoặc đăng nhập với</p>
                <span></span>
            </div>
            <div className={cx('login-social')}>
                <GoogleAuthButton onLoginWithGoogle={(token) => googleLogin(token)} />
            </div>
        </div>
    );
}

export default LoginForm;
