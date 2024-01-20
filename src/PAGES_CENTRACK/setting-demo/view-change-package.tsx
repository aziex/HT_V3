import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import './index.scss';

function ViewChangePackage() {
  const { user } = useSelector((state: any) => state);
  const match = useParams();

  return <Typography>Change Package</Typography>;
}

export default React.memo(ViewChangePackage);
