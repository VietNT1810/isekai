import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './ResetPassword.module.scss';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import assets from '@/assets';
import * as userService from '@/services/userService';
import { openAlert } from '@/reducers/alertSlice';

const cx = classNames.bind(styles);
const schema = yup
    .object({
        newPassword: yup
            .string()
            .required('Password is required')
            .min(8, 'Phải có 8 ký tự trở lên')
            .matches(/[a-z]+/, 'Phải có ít một ký tự viết thường')
            .matches(/[A-Z]+/, 'Phải có ít một ký tự viết hoa')
            .matches(/[@$!%*#?&]+/, 'Phải có ít nhất một ký tự đặc biệt'),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Mật khẩu phải trùng khớp'),
    })
    .required();

function ResetPassword(props) {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data) => {
        await userService
            .resetPassword({ password: data.newPassword }, token)
            .then((res) => {
                dispatch(openAlert({ message: res.message }));
                navigate('/login');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={assets.images.logoBlack} alt="" />
            </div>
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
