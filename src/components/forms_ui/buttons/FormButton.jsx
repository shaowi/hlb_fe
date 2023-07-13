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
  const buttonProps = {
    type,
    variant: 'contained',
    ...componentProps
  };

  return isReset ? (
    <ResetButton />
  ) : type === 'loading' ? (
    <LoadingButton loading={isLoading} {...buttonProps}>
      {label}
    </LoadingButton>
  ) : (
    <Button {...buttonProps}>{label}</Button>
  );
}
