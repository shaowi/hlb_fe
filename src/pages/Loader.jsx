import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

export default function Loader() {
  return (
    <Backdrop
      style={{
        zIndex: 9999,
        color: '#fff'
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
