import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useDispatch } from 'react-redux';
import { handleSnackbar } from '../../../REDUX/reducer_app';
import {
  axios_sendVerificationCode,
  axios_verifyVerificationCode,
} from '../axios';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref: any) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask='xm-000-000'
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

const CodeVerifyForm = ({ callback }: any) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({ value: '', error: '' });
  const [verificationCode, setVerificationCode] = useState({
    value: '',
    error: '',
  });

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({ error: '', value: event.target.value });
  };

  const handleVerificationCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode({ error: '', value: event.target.value });
  };

  const [verifyMode, setVerifyMode] = useState(false);

  const handle_sendVerificationCode = async () => {
    setIsLoading(true);
    handleSnackbar({ open: false });

    const result: any = await axios_sendVerificationCode({
      data: { email: email.value },
    });

    if (result.status) {
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'success' })
      );
      setVerifyMode(true);
    } else {
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'error' })
      );
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handle_sendVerificationCode();
  };

  useEffect(() => {
    const newCode = verificationCode.value.replace(/-/g, '').replace(/xm/g, '');
    console.log(newCode);
    if (newCode.length == 4) {
      handle_verifyVerificationCode(newCode);
    }
  }, [verificationCode.value]);

  const handle_verifyVerificationCode = async (newCode: string) => {
    handleSnackbar({ open: false });

    const result: any = await axios_verifyVerificationCode({
      data: { email: email.value, code: newCode },
    });

    if (result.status) {
      setVerificationCode({ ...verificationCode, error: '' });
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'success' })
      );
      if (callback) {
        callback({ email: email.value });
      }
    } else {
      setVerificationCode({ ...verificationCode, error: result.message });

      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'error' })
      );
    }
  };
  return verifyMode ? (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            disabled={true}
            type='email'
            value={email.value}
            required
            inputProps={{
              style: { fontSize: 14 },
            }}
            InputLabelProps={{ sx: { fontSize: 14 } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Verification Code'
            variant='outlined'
            type='text'
            required
            value={verificationCode.value}
            onChange={handleVerificationCode}
            InputProps={{
              inputComponent: TextMaskCustom as any,
              style: { fontSize: 14 },
            }}
            inputProps={{
              style: { fontSize: 14 },
            }}
            InputLabelProps={{ sx: { fontSize: 14 } }}
            error={!!verificationCode.error}
            helperText={verificationCode.error}
          />
        </Grid>
      </Grid>
    </form>
  ) : (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            type='email'
            required
            inputProps={{
              style: { fontSize: 14 },
            }}
            InputLabelProps={{ sx: { fontSize: 14 } }}
            value={email.value}
            onChange={handleEmail}
            error={!!email.error}
            helperText={email.error}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <LoadingButton
          loading={isLoading}
          type='submit'
          fullWidth
          variant='contained'
          sx={{
            borderRadius: '40px',
            padding: '12px',
          }}
        >
          Verify Email
        </LoadingButton>
      </Box>
    </form>
  );
};

export default CodeVerifyForm;
