import { Button } from '@mui/material';
import React from 'react';
import PageviewIcon from '@mui/icons-material/Pageview';

const ActionButton = ({ handleClick }) => {
  return (
    <Button variant="contained" color="success" onClick={handleClick}>
      <PageviewIcon />
    </Button>
  );
};

export default ActionButton;
