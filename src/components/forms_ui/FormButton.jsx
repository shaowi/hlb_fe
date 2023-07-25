import { Button } from '@mui/material';
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormikContext } from 'formik';

/**
 * The `FormButton` component is a button that can be used in a form, with support for different types (submit, reset,
 * loading) and integration with Formik.
 * @returns a button component. If the type is 'loading', it returns a LoadingButton component with the label as its child.
 * Otherwise, it returns a regular Button component with the label as its child.
 */
export default function FormButton(props) {
  let { label, type = 'submit', isLoading, componentProps } = props;
  const formikContext = useFormikContext();
  let buttonProps = {
    type,
    variant: 'contained',
    ...componentProps
  };
  // access formik context to check if the form is dirty.
  if (formikContext && type === 'reset') {
    const { dirty, resetForm } = formikContext;
    buttonProps = {
      ...buttonProps,
      color: 'error',
      disabled: !dirty,
      onClick: resetForm
    };
    label = 'Reset';
  }

  return type === 'loading' ? (
    <LoadingButton loading={isLoading} {...buttonProps}>
      {label}
    </LoadingButton>
  ) : (
    <Button {...buttonProps}>{label}</Button>
  );
}
