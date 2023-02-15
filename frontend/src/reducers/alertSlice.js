import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        isOpen: false,
        message: '',
        severity: '',
    },
    reducers: {
        openAlert: (state, action) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        closeAlert: (state) => {
            state.isOpen = false;
            state.message = '';
            state.severity = '';
        },
    },
});

export const { openAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;
