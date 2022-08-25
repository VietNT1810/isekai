import React from 'react';
import classNames from 'classnames/bind';

import styles from './InputField.module.scss';
import { FilledInput, FormControl, FormHelperText, InputLabel } from '@mui/material';

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
    return (
        <FormControl
            fullWidth={fullWidth}
            variant={variant}
            error={error}
            margin="dense"
            sx={{
                backgroundColor: '#ebf9fb',
            }}
        >
            <InputLabel htmlFor={id} sx={{ fontSize: 16 }}>
                {label}
            </InputLabel>
            <FilledInput
                id={id}
                name={name}
                type={type || 'text'}
                sx={{ fontSize: 16 }}
                {...register(name, { required })}
                {...passProps}
            />
            {helperText && <FormHelperText id="component-error-text">{helperText}</FormHelperText>}
        </FormControl>
    );
}

export default InputField;
