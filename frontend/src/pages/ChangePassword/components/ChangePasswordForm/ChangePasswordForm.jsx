import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import styles from './ChangePasswordForm.module.scss';

const cx = classNames.bind(styles);

function ChangePasswordForm({ submitForm }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({});

    return (
        <form
            onSubmit={handleSubmit((data) => {
                submitForm(data);
            })}
            className={cx('form')}
        >
            <InputField
                variant="filled"
                type="password"
                id="currentPassword"
                name="currentPassword"
                label="Mật khẩu hiện tại"
                required
                register={register}
            />
            <InputField
                variant="filled"
                type="password"
                id="newPassword"
                name="newPassword"
                label="Mật khẩu mới"
                required
                register={register}
            />
            <InputField
                variant="filled"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Xác nhận mặt khẩu"
                required
                register={register}
            />
            <Button primary>Xác nhận</Button>
        </form>
    );
}

export default ChangePasswordForm;
