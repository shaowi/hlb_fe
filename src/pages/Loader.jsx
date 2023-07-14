import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

/** The code is defining a React functional component called `Loader`. This component renders a circular progress indicator
from the Material-UI library (`CircularProgress`) inside a backdrop (`Backdrop`) component. The backdrop is styled with
a zIndex of 9999 and a white color. The `open` prop of the backdrop is set to `true`, indicating that the backdrop
should be visible. */
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
