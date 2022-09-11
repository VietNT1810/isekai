import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

function InputField({
    variant,
    label,
    helperText,
    fullWidth,
    error,
    name,
    type,
    register,
    required,
    id,
    ...passProps
}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth={fullWidth} variant={variant} error={error} margin="dense" className={cx('input-group')}>
            <InputLabel htmlFor={id} className={cx('label')}>
                {label}
            </InputLabel>
            <FilledInput
                disableUnderline
                id={id}
                name={name}
                type={showPassword ? 'text' : type}
                className={cx('input')}
                {...register(name, { required: required })}
                {...passProps}
                endAdornment={
                    type === 'password' ? (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                                className={cx('input')}
                            >
                                {showPassword ? (
                                    <VisibilityOff fontSize="inherit" />
                                ) : (
                                    <Visibility fontSize="inherit" />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ) : null
                }
            />
            {helperText && <FormHelperText id="component-error-text">{helperText}</FormHelperText>}
        </FormControl>
    );
}

export default InputField;
