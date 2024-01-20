import useMediaQuery from '@mui/material/useMediaQuery';

import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import DeviceDetect from './device-detect';
import { useLocation, useParams } from 'react-router-dom';
import { axios_user } from '../PAGES/user/axios';
import { handleIsAutoTheme, handleIsDarkTheme, handleModalUser, handleSnackbar } from '../REDUX/reducer_app';

import {
  deleteUserToken,
  getIsAutoTheme,
  getIsDarkTheme,
  getUserToken,
} from '../SERVICES/sessions';

import SnackbarMessage from './snackbar-message';
import { handleIsLogin, handleUserSession } from '../REDUX/reducer_user';

const userToken: string | boolean = getUserToken();

const InitialRendering = () => {
  const params: any = useParams();
  const dispatch = useDispatch();
  const { user, app } = useSelector((state: any) => state);
  const socketRef: any = React.useRef();

  React.useLayoutEffect(() => {
    const isAutoTheme = getIsAutoTheme();
    const isDarkTheme: boolean | undefined = getIsDarkTheme();

    if (isAutoTheme) {
      dispatch(handleIsAutoTheme({ is_auto_theme: true }));
    } else {
      dispatch(handleIsAutoTheme({ is_auto_theme: false }));
      dispatch(
        handleIsDarkTheme({ is_dark_theme: isDarkTheme ? true : false })
      );
    }
  }, []);

  React.useLayoutEffect(() => {
    getUserData();
  }, [user.req_session_time]);

  const getUserData = async () => {
    const token: string | boolean | undefined = getUserToken();

    if (token) {
      handleSnackbar({ open: false });
      dispatch(handleUserSession({ is_loading: true }));
      const result: any = await axios_user({
        params: {
          filters: {
            withRole: true,
            withGender: true,
            rolePermissions: true,
          },
        },
      });

      if (result.status) {
        dispatch(handleUserSession({ is_loading: false, data: result.data }));
        dispatch(handleIsLogin({ is_login: true }));
        const user = result.data;
        if (
          !user.fullname ||
          !user.firstname ||
          !user.firstname ||
          !user.gender ||
          !user.birthdate ||
          !user.email ||
          !user.phone_number ||
          !user.has_password
        ) {
          dispatch(
            handleModalUser({ open: true, type: 'MANAGE_USER', data: user })
          );
        }
      } else {
        dispatch(
          handleSnackbar({ open: true, message: result.message, type: 'error' })
        );
        dispatch(handleUserSession({ is_loading: false, data: null }));

        if (
          result.message ==
          'failed authenthication : No session token is found!'
        ) {
          deleteUserToken();
        }
      }
    }
  };

  return <div></div>;
};

const InitialRenderingMemo = memo(InitialRendering);

const ThemeAutoSystem = () => {
  const redux = useSelector((state: any) => state);
  const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    const isAutoTheme = getIsAutoTheme();
    if (isAutoTheme) {
      if (isDarkModeEnabled) {
        dispatch(handleIsDarkTheme({ is_dark_theme: isDarkModeEnabled }));
      } else {
        dispatch(handleIsDarkTheme({ is_dark_theme: isDarkModeEnabled }));
      }
    }
  }, [redux.app.is_auto_theme]);
  return null;
};

const MainLayout = ({ children }: any) => {
  const redux = useSelector((state: any) => state);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add(
      'webapp--wrapper',
      redux.app.language,
      redux.app.is_dark_theme ? 'dark' : 'light'
    );
    return () => {
      document.body.classList.remove(
        'webapp--wrapper',
        redux.app.language,
        redux.app.is_dark_theme ? 'dark' : 'light'
      );
    };
  }, [redux.app.is_dark_theme, redux.app.language]);

  return (
    <div>
      {/* <DeviceDetect /> */}
      <ThemeAutoSystem />

      <InitialRenderingMemo />

      <SnackbarMessage />

      {children}
    </div>
  );
};

export default memo(MainLayout);


