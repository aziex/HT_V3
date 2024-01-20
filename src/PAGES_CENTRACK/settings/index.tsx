import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Appbar from '../../CONTAINERS/centrack/appbar';

import DrawerList from './component/drawer-list';

import './index.scss';

function Index() {
  const { user } = useSelector((state: any) => state);
  const match = useParams();

  return (
    <Appbar drawerList={<DrawerList />} id='home' title={'Settings'}>
      settings
    </Appbar>
  );
}

export default React.memo(Index);
