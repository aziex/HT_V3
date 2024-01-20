import { CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../PAGES/login';
import ScrollToTop from '../UTILS/scroll-to-top';
import { CheckPrivateRoute, PrivateRoute } from './private-route';
import RegistrationPage from '../PAGES/register';
import LogoutPage from '../PAGES/logout';
//import React from 'react';

const Home = lazy(() => import('../PAGES_CENTRACK/home/index'));
const Settings = lazy(() => import('../PAGES_CENTRACK/settings/index'));
const UserView = lazy (() => import ('../PAGES/user/index'));
const SettingsDemo = lazy(
  () => import('../PAGES_CENTRACK/setting-demo/index')
);
const MembershipPlan = lazy (() => import ('../PAGES/plan-package/membership'));

function MainRouter() {
  return (
    <Suspense
      fallback={
        <div className='webapp-loading-wrapper'>
          <CircularProgress color='primary' />
        </div>
      }
    >
      <ScrollToTop>
        <Routes>
          {/* <Route
            index
            element={
              <PrivateRoute>
                <LessonsDashboard />
              </PrivateRoute>
            }
          /> */}

          <Route index element={<Home />} />
          <Route path='/settings' element={<Settings />} />
          <Route
            path='/centrack/settings-demo/:view?'
            element={<SettingsDemo />}
          />
            <Route
              path='/login'
              element={
                <CheckPrivateRoute>
                  <LoginPage />
                </CheckPrivateRoute>
              }
            />
            <Route
              path='/logout'
              element={
                <PrivateRoute>
                  <LogoutPage />
                </PrivateRoute>
              }
            />
             <Route
              path='/register'
              element={
                <CheckPrivateRoute>
                  <RegistrationPage />
                </CheckPrivateRoute>
              }
            /> 
            <Route
              path='/membership'
              element={
                <CheckPrivateRoute>
                  <MembershipPlan />
                </CheckPrivateRoute>
              }
            />
        {/* <Route
              path='/reset-password'
              element={<RegistrationPage />}/>  */}
              <Route
              path='/user/:view/:slug?'
              element={
                <PrivateRoute>
                  <UserView />
                </PrivateRoute>
              }
            /> 
        </Routes>
      </ScrollToTop>
    </Suspense>
  );
}

export default MainRouter;
