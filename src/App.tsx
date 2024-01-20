import { memo } from 'react';
import './App.scss';
import MainWrapper from './CONTAINERS/main-wrapper';
//import Offline from './offline';
import './i18n';
import MainRouter from './ROUTERS/index';

function App() {
  return (
    // <Offline>
    <MainWrapper>
      <MainRouter />
    </MainWrapper>
    // </Offline>
  );
}

export default memo(App);
