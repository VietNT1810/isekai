import classNames from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import CheckboxField from '@/components/CheckboxField';
import InputField from '@/components/InputField';
import styles from './RegisterForm.module.scss';
import Button from '@/components/Button';
import assets from '@/assets';

const cx = classNames.bind(styles);
const schema = yup
    .object({
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    .required();

function RegisterForm({ submitForm }) {
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <div className={cx('register-form')}>
            <h1 className={cx('title')}>Đăng ký</h1>
            <form
                onSubmit={handleSubmit((data) => {
                    submitForm(data);
                })}
            >
                <small className={cx('login')}>
                    Bạn đã có tài khoản?
                    <NavLink to="/login">Đăng nhập</NavLink>
                </small>
                <InputField
                    variant="filled"
                    id="username"
                    label="Username"
                    name="username"
                    fullWidth
                    register={register}
                    required
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                />
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
                <InputField
                    variant="filled"
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    fullWidth
                    register={register}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                />
                <Button action type="submit">
                    Đăng ký
                </Button>
            </form>
            <div className={cx('register-choice')}>
                <span></span>
                <p>Hoặc đăng ký bằng</p>
                <span></span>
            </div>
            <div className={cx('register-social')}>
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

export default RegisterForm;
