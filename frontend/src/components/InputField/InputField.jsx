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
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                border: '2px solid #1e69a2'
            }}
        >
            <InputLabel htmlFor={id} sx={{ fontSize: 16 }}>
                {label}
            </InputLabel>
            <FilledInput
                disableUnderline
                id={id}
                name={name}
                type={type || 'text'}
                sx={{ fontSize: 16 }}
                {...register(name, { required: required })}
                {...passProps}
            />
            {helperText && <FormHelperText id="component-error-text">{helperText}</FormHelperText>}
        </FormControl>
    );
}

export default InputField;
