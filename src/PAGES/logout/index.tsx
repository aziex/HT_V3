import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../CONTAINERS/content-wrapper';
import { handleSnackbar } from '../../REDUX/reducer_app';
import { reset } from '../../REDUX/reducer_user';
import { deleteUserToken } from '../../SERVICES/sessions';
import { axios_logout } from '../logout/axios';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { user }: any = useSelector((state) => state);
  const dispatch = useDispatch();

  const handle_logout = async () => {
    handleSnackbar({ open: false });

    const result: any = await axios_logout({
      data: {},
    });

    if (result.status) {
      dispatch(
        handleSnackbar({open: true, message: result.message, type: 'success'}),
      );
      localStorage.clear();
      deleteUserToken();

      setTimeout(() => {
        dispatch(reset());
        navigate('/login');
      }, 1000);
    } else {
      dispatch(
        handleSnackbar({ open: true, message: result.message, type: 'error' })
      );
    }
  };

  useEffect(() => {
    handle_logout();
  }, []);

  return (
    <ContentWrapper>
      <Box
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress style={{ marginRight: 10 }} color='primary' />

        <Typography>Logout...</Typography>
      </Box>
    </ContentWrapper>
  );
};

export default memo(LogoutPage);
