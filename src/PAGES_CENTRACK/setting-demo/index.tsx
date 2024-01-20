import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Appbar from '../../CONTAINERS/centrack/appbar';

import DrawerList from './component/drawer-list';

import { CircularProgress } from '@mui/material';
import './index.scss';

const ViewChangePackage = React.lazy(() => import('./view-change-package'));

const ViewExtendSubscription = React.lazy(
  () => import('./view-extend-subscription')
);

const ViewResetPassword = React.lazy(() => import('./view-reset'));

function Index() {
  const { user } = useSelector((state: any) => state);
  const match = useParams();

  const view = match.view ? match.view : 'extend-subscription';

  return (
    <Appbar
      drawerList={<DrawerList view={view} />}
      id='home'
      title={'Settings'}
    >
      <React.Suspense
        fallback={
          <div className='webapp-loading-wrapper'>
            <CircularProgress color='primary' />
          </div>
        }
      >
        {view === 'extend-subscription' ? <ViewExtendSubscription /> : null}
        {view === 'reset-password' ? <ViewResetPassword /> : null}
        {view === 'change-package' ? <ViewChangePackage /> : null}
      </React.Suspense>
    </Appbar>
  );
}

export default React.memo(Index);
