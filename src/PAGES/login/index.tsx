import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  createTheme,
  ThemeProvider,
  Paper,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { handleSnackbar } from '../../REDUX/reducer_app';
import { handleReqSessionTime } from '../../REDUX/reducer_user';
import { setUserToken } from '../../SERVICES/sessions';
import { passwordValidator } from '../../UTILS/input-validator';
import SocialLogin from '../register/component/social-login';
import xcelearn from '../../ASSETS/xcelearn-logo.png';
import signin_logo from '../../ASSETS/Signin_logo.svg';
import { axios_login, axios_loginByToken } from './axios';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues]: any = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });

  const handleValuesChange = (obj: any) => {
    setValues({ ...values, ...obj });
  };

  const handleLoginPressed = () => {
    const emailError =
      values.email.trim().length == 0 ? 'Email cannot be empty' : '';
    const passwordError = passwordValidator(values.password);

    if (passwordError || emailError) {
      handleValuesChange({
        passwordError: passwordError,
        emailError: emailError,
      });
      return;
    }

    handle_login();
  };

  const handle_login = async () => {
    setIsLoading(true);
    handleSnackbar({ open: false });

    const result: any = await axios_login({
      data: {
        user_key: values.email,
        password: values.password,
      },
    });

    if (result.status) {
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'success' })
      );
      setUserToken(result.data.token);
      dispatch(handleReqSessionTime());
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'error' })
      );
      setIsLoading(false);
    }
  };

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const tokenURL: any = params.get('token');

  useLayoutEffect(() => {
    if (tokenURL) {
      handle_loginByToken();
    }
  }, [tokenURL]);

  const handle_loginByToken = async () => {
    setIsLoading(true);
    handleSnackbar({ open: false });

    const result: any = await axios_loginByToken({
      data: {
        token: decodeURIComponent(tokenURL),
      },
    });

    if (result.status) {
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'success' })
      );
      setUserToken(result.data.token);
      dispatch(handleReqSessionTime());
      setTimeout(() => {
        navigate('/');
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
    handleLoginPressed();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const headline2 = {
    color: '#14171A',
    fontFamily: 'Passion One',
    fontSize: 64,
    fontWeight: 700,
  };

  const theme = createTheme({
    typography: {
      fontFamily:'Outfit, san-serif'
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{minHeight:'100vh', overflowY:'hidden'}}>

        {/* button & logo */}

        <Box
          position="absolute"
          top="30px"
          right="70px"
          marginBottom="50px"
          display="flex"
          alignItems="center"
          zIndex={1}
      >
          <LanguageIcon fontSize='small'/>

          <Typography sx={{ marginLeft:'10px',  marginRight: '15px', fontSize: '14px' }}>
              English
          </Typography>
          <Button
        onClick={() =>('/register')}
        variant='outlined'
        sx={{
          backgroundColor: '#FFF',
          color: '#14171A',
          borderRadius: '50px',
          padding: '12px',
          fontSize: '12px',
          width: '88px',
          height: '37px',
          border: '1px solid #0F6CA7',
          fontWeight:900,
          borderColor:'#0197D6'
        }}
        component={NavLink}
        to='/register'
      >
        SIGN UP
      </Button> 
      </Box>

      <Grid item xs={12} sm={6}>
      <Box style={{ position: 'relative', height: '100vh' }}>
  <Box
          position="absolute"
          top="10px"
          left="20px"
          zIndex={1} // Ensure it's above the image
      >
        <img src={xcelearn} style={{ height: 'auto', maxWidth: '170px', marginTop:'20px', marginLeft: '25px'}} />
      </Box>

      {/* Left Side: Image */}
      <Box sx={{ position:'relative', backgroundColor: '#F5F8FA',  textAlign:'inherit', maxWidth:'850px', height: '100%', marginLeft: 'none'}}>
        <Box marginLeft='90px'>
        <img src={signin_logo}  style={{ width: '200px', height: '240px', marginLeft:'100px', marginTop:'200px'}} />
        <Typography sx={{fontfamily: 'Folio Extra Bold'}}
        style={headline2}
        variant='h2'
        marginLeft='100px'
          >
          Welcome Back to Xcelearn!
        </Typography>
        <Typography sx={{textAlign: 'inherit', marginTop: '10px', fontFamily: 'Outfit', marginLeft:'100px'}}
          
          >
          Sign in to Xcelearn.
        </Typography>
        </Box>
      </Box>
      </Box>
     </Grid>
  
  {/* Right Side: Form */}

  <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
      <Box style={{ 
        flex: 5, 
        position: 'relative', 
        maxWidth: '470px', // Adjust the width as needed
        margin: '0 auto',
        }}>
        
        <Box textAlign='center' sx={{
              textAlign: 'center'
               }}>
              <Typography
                color='#14171A'
                variant='body2'
                fontFamily={'Outfit'}
                fontWeight={'900'}
                sx={{ MarginTop: '20px', marginBottom: '32px'}}
                
              >
                Sign Up
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
              <SocialLogin />
              <Divider sx={{marginBottom: '30px', marginTop: '30px', color:'#14171A'}}>
                <Typography

                  fontFamily={'Outfit'}
                  fontWeight={'900'}
                >  
                     OR
                  </Typography>
                </Divider>
            </Box>
             <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Email/Username'
                    variant='outlined'
                    type='text'
                    required
                    InputProps={{
                      style: { 
                        fontSize: 14,
                        fontFamily: 'Outfit',
                        backgroundColor: '#F3F6F7',
                        borderRadius: '10px'
                       },
                      }}
                    InputLabelProps={{
                      sx: { fontSize: 14 },
                    }}
                    value={values.email}
                    onChange={(e: any) =>
                      handleValuesChange({
                        email: e.target.value,
                        emailError: '',
                      })
                    }
                    error={!!values.emailError}
                    helperText={values.emailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Password'
                    variant='outlined'
                    type={values.showPassword ? 'text' : 'password'}
                    required
                    InputProps={{
                      style: { 
                        fontSize: 14,
                        fontFamily: 'Outfit',
                        backgroundColor: '#F3F6F7',
                        borderRadius: '10px'
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
                
                <Grid container alignItems="center" spacing={2}  fontSize='14px'>
      <Grid item xs={12} sm={6}>
        <FormGroup sx={{ marginLeft: 2 }}>
          <FormControlLabel
            control={<Checkbox defaultChecked size="small"  />}
            label="Keep me logged in"           
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={6} marginTop={0} textAlign='right'>
          <Typography
            sx={{
              fontSize: '14px',
              textDecoration: 'none',
              color: '#0197D6',
              fontWeight: '900',
            }}
            variant="caption"
            component={NavLink}
            to="/forgot-password"
          >
            Forgot Password?
          </Typography>
      </Grid>
    </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <LoadingButton
                  loading={isLoading}
                  // disabled={isLoading}
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    borderRadius: '10px',
                    padding: '12px',
                    backgroundColor: '#0197D6',
                  }}
                >
                  Sign In
                </LoadingButton>
              </Box>
            </form>
            <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
              <Typography color='text.secondary' variant='caption'>
                Don't have an account?{' '}
                  <Typography sx={{
                    textDecoration:'none'
                  }} 
                color='#0197D6'
                variant='caption'
                fontWeight= '600'
                component={NavLink}
                to='/register'
              >
                Sign up
                  </Typography>
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', marginTop: '30px'}}>
              <Typography 
            
              font-family= {'Outfit'}
              fontSize={'13px'}
              font-weight= {'300'}
              style={{ color: '#0E6BAF'}}
              >
                <NavLink to='' style={{ textDecoration: 'none', color: '#0F6AAE'}} >
                  Term of Service</NavLink>{' '}
                  <span style={{ margin: '0 12px' }}></span>
                  <NavLink to='/policy' style={{ textDecoration: 'none', color: '#0F6AAE' }}>  
                  Policy
                </NavLink>
              </Typography>
              </Box>

          </Box>
      </Grid> 

      </Grid>
      
    </ThemeProvider>
  );
}

export default LoginPage;
