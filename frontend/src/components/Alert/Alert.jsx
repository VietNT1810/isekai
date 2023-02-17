import { closeAlert } from '@/reducers/alertSlice';
import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

function Alert(props) {
    const { isOpen, message, severity } = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeAlert());
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <MuiAlert
                variant="filled"
                severity={severity}
                sx={{ width: '400px', fontSize: '14px', fontFamily: 'SVN Gotham Regular', alignItems: 'center' }}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
}

export default Alert;
