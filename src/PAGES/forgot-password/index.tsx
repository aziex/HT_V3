import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleSnackbar } from '../../REDUX/reducer_app';
import { passwordValidator } from '../../UTILS/input-validator';
import { axios_createNewPassword } from './axios';
import CodeVerifyForm from './component/code-verify';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  const [values, setValues]: any = useState({
    email: '',
    emailError: '',

    password: '',
    passwordError: '',
    confirmPassword: '',
  });

  const handleValuesChange = (obj: any) => {
    setValues({ ...values, ...obj });
  };

  const onChange = () => {
    //const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(values.password);

    if (passwordError) {
      handleValuesChange({
        passwordError: passwordError,
      });
      return;
    }

    if (values.password != values.confirmPassword) {
      handleValuesChange({
        passwordError: 'Confirm password is not match!',
      });
      return;
    }

    handle_changePassword();

    navigate.navigate('HomePage');
  };

  const handle_changePassword = async () => {
    setIsLoading(true);
    handleSnackbar({ open: false });

    const result: any = await axios_createNewPassword({
      data: {
        email: values.email,

        password: values.password,
      },
    });

    if (result.status) {
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'success' })
      );

      setTimeout(() => {
        navigate('/login');
      }, 500);
    } else {
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'error' })
      );
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onChange();
  };

  const handleCallBack = (obj: any) => {
    if (obj.email) {
      handleValuesChange({ email: obj.email });
      setPasswordMode(true);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ height: '100vh' }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={4} sx={{ padding: '32px' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant='h5'
                sx={{ marginBottom: '8px', fontWeight: 500 }}
              >
                Forgot Your Password?
              </Typography>
              <Typography
                color='text.secondary'
                variant='body2'
                sx={{ marginBottom: '32px', fontWeight: 500 }}
              >
                Reset your password using code verification
              </Typography>
            </Box>
            {passwordMode ? (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Email'
                      variant='outlined'
                      type='email'
                      disabled={true}
                      required
                      inputProps={{
                        style: { fontSize: 14 },
                      }}
                      InputLabelProps={{ sx: { fontSize: 14 } }}
                      value={values.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='New Password'
                      variant='outlined'
                      type='password'
                      required
                      inputProps={{
                        style: { fontSize: 14 },
                      }}
                      InputLabelProps={{ sx: { fontSize: 14 } }}
                      value={values.password}
                      onChange={(e: any) =>
                        handleValuesChange({
                          password: e.target.value,
                          passwordError: '',
                        })
                      }
                      error={!!values.passwordError}
                      helperText={values.passwordError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Confirm New Password'
                      variant='outlined'
                      type='password'
                      required
                      inputProps={{
                        style: { fontSize: 14 },
                      }}
                      InputLabelProps={{ sx: { fontSize: 14 } }}
                      value={values.confirmPassword}
                      onChange={(e: any) =>
                        handleValuesChange({
                          confirmPassword: e.target.value,
                          passwordError: '',
                        })
                      }
                      error={!!values.passwordError}
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
                      borderRadius: '50px',
                      padding: '12px',
                    }}
                  >
                    Save Changes
                  </LoadingButton>
                </Box>
              </form>
            ) : (
              <CodeVerifyForm callback={handleCallBack} />
            )}

            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography color='text.secondary' variant='caption'>
                <Typography
                  color='text.primary'
                  variant='caption'
                  component={NavLink}
                  to='/login'
                >
                  Back to login
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegistrationPage;
