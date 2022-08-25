import React from 'react';
import classNames from 'classnames/bind';

import styles from './InputField.module.scss';
import { FilledInput, FormControl, FormHelperText, InputLabel } from '@mui/material';

const cx = classNames.bind(styles);

function InputField({ variant, label, helperText, fullWidth, error, name }) {
    return (
        // <TextField
        //     variant="filled"
        //     fullWidth
        //     label={label}
        //     margin="dense"
        //     InputProps={{ style: { fontSize: 16 } }}
        //     InputLabelProps={{ style: { fontSize: 16 } }}
        // />
        <FormControl
            fullWidth={fullWidth}
            variant={variant}
            error={error}
            sx={{
                backgroundColor: '#ebf9fb'
            }}
        >
            <InputLabel htmlFor="component-filled" sx={{ fontSize: 16 }}>
                {label}
            </InputLabel>
            <FilledInput id="component-filled" name={name} sx={{ fontSize: 16 }} />
            {helperText && <FormHelperText id="component-error-text">{helperText}</FormHelperText>}
        </FormControl>
    );
}

export default InputField;
