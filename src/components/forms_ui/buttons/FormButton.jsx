import { Button } from '@mui/material';
import React from 'react';
import ResetButton from 'components/forms_ui/buttons/ResetButton';

export default function FormButton({
  label,
  type = 'submit',
  isReset,
  ...props
}) {
  return isReset ? (
    <ResetButton />
  ) : (
    <Button type={type} variant="contained" {...props}>
      {label}
    </Button>
  );
}