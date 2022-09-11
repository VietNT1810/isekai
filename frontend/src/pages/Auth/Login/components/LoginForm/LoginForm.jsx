import classNames from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import CheckboxField from '@/components/CheckboxField';
import InputField from '@/components/InputField';
import styles from './LoginForm.module.scss';
import Button from '@/components/Button';
import assets from '@/assets';

const cx = classNames.bind(styles);
const schema = yup
    .object({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
    })
    .required();

function LoginForm({ submitForm }) {
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
                <NavLink to="/register">Tạo tài khoản ở đây</NavLink>
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
                    <NavLink to="/login/identify">Quên mật khẩu ?</NavLink>
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
                <div className={cx('action-social')}>
                    <img src={assets.icons.iconGoogle} alt="No image here" />
                </div>
                <div className={cx('action-social')}>
                    <img src={assets.icons.iconFacebook} alt="No image here" />
                </div>
                <div className={cx('action-social')}>
                    <img src={assets.icons.iconLinkedin} alt="No image here" />
                </div>
                <div className={cx('action-social')}>
                    <img src={assets.icons.iconTwitter} alt="No image here" />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
