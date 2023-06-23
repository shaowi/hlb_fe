import { Button } from '@mui/material';
import React from 'react';

export default function FormButton({ label, type = 'submit', ...props }) {
  return (
    <Button type={type} variant="contained" {...props}>
      {label}
    </Button>
  );
}
