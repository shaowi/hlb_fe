import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';

const ResetButton = ({ disabled }) => {
  //access formik context to check if the form is dirty.
  const { dirty, resetForm } = useFormikContext();
  return (
    <Button
      type="submit"
      variant="contained"
      color="error"
      disabled={!dirty || disabled}
      onClick={resetForm}
    >
      Reset
    </Button>
  );
};

export default ResetButton;
