import { Button } from '@mui/material';
import React from 'react';
import ResetButton from 'components/forms_ui/buttons/ResetButton';
import LoadingButton from '@mui/lab/LoadingButton';

export default function FormButton({
  label,
  type = 'submit',
  isReset,
  isLoading,
  componentProps
}) {
  return isReset ? (
    <ResetButton />
  ) : type === 'loading' ? (
    <LoadingButton
      type={type}
      loading={isLoading}
      variant="contained"
      {...componentProps}
    >
      {label}
    </LoadingButton>
  ) : (
    <Button type={type} variant="contained" {...componentProps}>
      {label}
    </Button>
  );
}
