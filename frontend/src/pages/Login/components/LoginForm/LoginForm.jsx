import React from 'react';
import classNames from 'classnames/bind';

import styles from './LoginForm.module.scss';
import InputField from '@/components/InputField';
import { NavLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

const cx = classNames.bind(styles);

function LoginForm(props) {
    const { register, control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={cx('login-form')}>
            <h1>Đăng nhập</h1>
            <h4>
                Người mới?
                <NavLink to="/register">Tạo tài khoản ở đây</NavLink>
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField variant="filled" id="email" label="Email" name="email" fullWidth register={register} />
                <InputField
                    variant="filled"
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    fullWidth
                    register={register}
                    autoComplete="on"
                />
                <small>
                    <NavLink to="/register">Quên mật khẩu ?</NavLink>
                </small>
                <Controller
                    name="remember"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                        <FormControlLabel
                            label={<Typography sx={{ fontSize: 16, fontWeight: "bold" }}>Giữ tôi luôn đăng nhập</Typography>}
                            control={
                                <Checkbox
                                    {...field}
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        color: '#ebf9fb',
                                        '&.Mui-checked': {
                                            color: '#ebf9fb',
                                        },
                                    }}
                                />
                            }
                        />
                    )}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;
