import { Button } from '@mui/material';
import React from 'react';
import ResetButton from 'components/forms_ui/buttons/ResetButton';
import LoadingButton from '@mui/lab/LoadingButton';

/**
 * The `FormButton` component is a React component that renders a button with different variations based on the `type`
 * prop.
 * @returns a JSX element. The specific JSX element being returned depends on the value of the `type` prop. If `type` is
 * equal to 'reset', it returns a `<ResetButton />` component. If `type` is equal to 'loading', it returns a
 * `<LoadingButton />` component with the `loading` prop set to the value of `isLoading` and the
 */
export default function FormButton(props) {
  const { label, type = 'submit', isLoading, componentProps } = props;
  const buttonProps = {
    type,
    variant: 'contained',
    ...componentProps
  };

  return type === 'reset' ? (
    <ResetButton />
  ) : type === 'loading' ? (
    <LoadingButton loading={isLoading} {...buttonProps}>
      {label}
    </LoadingButton>
  ) : (
    <Button {...buttonProps}>{label}</Button>
  );
}
