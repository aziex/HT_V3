import { TextFields, Visibility } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, InputAdornment, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react'
import { handleSnackbar } from '../../../REDUX/reducer_app';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import SocialLogin from './social-login';
import { LoadingButton } from '@mui/lab';
import { nameValidator, passwordValidator } from '../../../UTILS/input-validator';
import { axios_register } from '../axios';
import CodeVerifyForm from './code-verify';
import { setUserToken } from '../../../SERVICES/sessions';
import { handleReqSessionTime } from '../../../REDUX/reducer_user';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { studentTheme, parentTheme, tutorTheme } from './theme'; // Import the themes

const FormRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedValue = localStorage.getItem('seletedTab')

  const [isLoading, setIsLoading] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [value, setValue] = React.useState(storedValue || 'student');
  const [values, setValues]: any = useState({
    email: '',
    emailError: '',
    firstname: '',
    firstnameError: '',
    lastname: '',
    lastNameError: '',
    password: '',
    passwordError: '',
    // confirmPassword: '',
  });

  const handleValuesChange = (obj: any) => {
    setValues({ ...values, ...obj });
  };

  const onRegister = () => {
    const firstNameError = nameValidator(values.firstname);
    const lastNameError = nameValidator(values.lastname);
    //const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(values.password);

    if (firstNameError || lastNameError || passwordError) {
      handleValuesChange({
        firstnameError: firstNameError,
        lastnameError: lastNameError,
        passwordError: passwordError,
      });
      return;
    }

    // if (values.password != values.confirmPassword) {
    //   handleValuesChange({
    //     passwordError: 'Confirm password is not match!',
    //   });
    //   return;
    // }

    handle_register();

    //navigation.navigate('HomePage');
  };

  const handle_register = async () => {
    setIsLoading(true);
    handleSnackbar({ open: false });

    const result: any = await axios_register({
      data: {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
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
    onRegister();
  };

  const handleCallBack = (obj: any) => {
    if (obj.email) {
      handleValuesChange({ email: obj.email });
      setRegisterMode(true);
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

const styleField ={
  backgroundColor: '#F3F6F7',
  color: '#FFF',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '10px',
  
}
    
  return (

    <div>
      <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <SocialLogin/>
      </Grid>

      <Grid m={3}>
      <Divider sx={{marginBottom: '30px', marginTop: '30px', color:'#14171A'}}>
                <Typography
                  fontFamily={'Outfit'}
                  fontWeight={'900'}
                >  
                     OR
                  </Typography>
                </Divider>
      </Grid>

      <form onSubmit={handleSubmit}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
          {/* First Name */}
          <TextField
            sx={styleField}
            fullWidth
            label='First Name'
            variant='outlined'
            required
            inputProps={{
              style: { fontSize: 14 },
            }}
            InputLabelProps={{ sx: { fontSize: 14 } }}
            value={values.firstname}
            onChange={(e: any) =>
               handleValuesChange({
                firstname: e.target.value,
                 firstnameError: '',
              })
             }
            error={!!values.firstnameError}
            helperText={values.firstnameError}
          />
        </Grid>

          {/* Last Name */}
          <Grid item xs={6}>
          <TextField
            sx={styleField}
            fullWidth
            label='Last Name'
            variant='outlined'
            required
            inputProps={{
              style: { fontSize: 14 },
            }}
            InputLabelProps={{ sx: { fontSize: 14 } }}
            value={values.lastname}
            onChange={(e: any) =>
              handleValuesChange({
                lastname: e.target.value,
                lastnameError: '',
              })
            }
            error={!!values.lastnameError}
            helperText={values.lastnameError}
          />
          </Grid>
        </Grid>
       
       {/* Email */}
      <Grid marginTop="10px">
        <TextField
          sx={styleField}
          fullWidth
          label='Email'
          variant='outlined'
          type='email'
          disabled={false}
          required
          inputProps={{
            style: { fontSize: 14 },
          }}
          InputLabelProps={{ sx: { fontSize: 14 } }}
          value={values.email}
          onChange={(e) =>
          handleValuesChange({ 
            email: e.target.value,
          })
        }
        />

      </Grid>

      {/* Password */}
      <Grid marginTop="10px">
      <TextField
                    sx={styleField}
                    fullWidth
                    label='Password'
                    variant='outlined'
                    type={values.showPassword ? 'text' : 'password'}
                    required
                    InputProps={{
                      style: { 
                        fontSize: 14,
                        fontFamily: 'Outfit',
                       },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
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

      <Grid marginTop="30px" width="auto">
        <LoadingButton 
          loading={isLoading}
          type='submit'
          variant="contained" 
          sx={{ textTransform: 'none', height:'50px', borderRadius: '10px', fontWeight:'bold' }}
          fullWidth
          >
              Sign Up
              </LoadingButton>
              </Grid>     
              </form>         
    </div>
  )
}

export default FormRegister