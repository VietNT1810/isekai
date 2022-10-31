import classNames from 'classnames/bind';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './ResetPassword.module.scss';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import assets from '@/assets';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const schema = yup
    .object({
        newPassword: yup.string().required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    })
    .required();

function ResetPassword(props) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = (data) => {
        console.log('reset:', data);
    };

    return (
        <div className={cx('wrapper')}>
            <Link className={cx('logo')} to="/">
                <img src={assets.images.logoBlack} alt="" />
            </Link>
            <form onSubmit={handleSubmit(submitForm)} className={cx('reset-form')}>
                <InputField
                    variant="filled"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    required
                    register={register}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword?.message}
                />
                <InputField
                    variant="filled"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    required
                    register={register}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                />
                <Button action className={cx('submit-btn')} type="submit">
                    Xác nhận
                </Button>
            </form>
        </div>
    );
}

export default ResetPassword;
