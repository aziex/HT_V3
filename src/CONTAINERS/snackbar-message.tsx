import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSnackbar } from '../REDUX/reducer_app';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { app } = useSelector((state: any) => state);
  const open = app.snackbar.open;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(handleSnackbar({ open: false }));
  };

  const vertical = app.snackbar.position[0];
  const horizontal = app.snackbar.position[1];
  return (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={app.snackbar.type}
        sx={{ width: '100%' }}
      >
        {app.snackbar.message}
      </Alert>
    </Snackbar>
  );
}
