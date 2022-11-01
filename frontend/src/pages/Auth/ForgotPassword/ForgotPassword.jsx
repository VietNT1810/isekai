import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import styles from './ForgotPassword.module.scss';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import assets from '@/assets';
import * as userService from '@/services/userService';
import { Alert, Snackbar } from '@mui/material';

const cx = classNames.bind(styles);
const schema = yup
    .object({
        email: yup.string().email('Địa chỉ email không hợp lệ').required('Nhập địa chỉ email'),
    })
    .required();

function ForgotPassword(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [open, setOpen] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (email) => {
        if (!email) return;
        if (successMessage) return;
        await userService
            .forgotPassword(email)
            .then((res) => {
                console.log('res:', res);
                setOpen(true);
                setSuccessMessage(res.message);
            })
            .catch((err) => {
                console.log('err:', err.data.message);
                setErrorMessage(err.data.message);
            });
    };
    const handleClose = () => {
        setOpen(false);
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
                        error={Boolean(errors.email || errorMessage)}
                        helperText={errors.email?.message || errorMessage}
                        disabled={Boolean(successMessage)}
                    />
                    <Button action type="submit" disabled={Boolean(successMessage)}>
                        Gửi mã
                    </Button>
                </form>
                <div className={cx('forgot-image')}>
                    <img src={assets.images.forgotImage} alt="Something wrong" />
                </div>
            </div>
            <Snackbar open={open} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    variant="filled"
                    severity={successMessage ? 'success' : 'error'}
                    sx={{ width: '400px', fontSize: '14px', fontFamily: 'SVN Gotham Regular', alignItems: 'center' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ForgotPassword;
