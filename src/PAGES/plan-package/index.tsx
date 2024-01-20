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
        
      </Grid>
      
    </ThemeProvider>
  );
}

export default LoginPage;
