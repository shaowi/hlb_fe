import { Button } from '@mui/material';
import React from 'react';
import ResetButton from 'components/forms_ui/buttons/ResetButton';
import LoadingButton from '@mui/lab/LoadingButton';

/**
 * The `FormButton` component is a React component that renders a button with different variations based on the provided
 * props.
 * @returns a JSX element. The returned JSX element can be one of three options:
 * 1. If the `isReset` prop is true, it returns a `<ResetButton />` component.
 * 2. If the `type` prop is set to 'loading', it returns a `<LoadingButton>` component with the `loading` prop set to the
 * value of the `isLoading` prop.
 */
export default function FormButton(props) {
  const { label, type = 'submit', isReset, isLoading, componentProps } = props;
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
