import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';

function CheckboxField({ label, field }) {
    return (
        <FormControlLabel
            label={<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>{label}</Typography>}
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
    );
}

export default CheckboxField;
