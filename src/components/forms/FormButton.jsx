import { Button } from '@mui/material';
import React from 'react';

export default function FormButton({ label, ...props }) {
  return (
    <Button type="submit" variant="contained" {...props}>
      {label}
    </Button>
  );
}
