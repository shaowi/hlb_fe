import { Button } from '@mui/material';
import React from 'react';

export default function ActionButton({
  color = 'success',
  handleClick,
  children,
  ...props
}) {
  return (
    <Button variant="contained" color={color} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
