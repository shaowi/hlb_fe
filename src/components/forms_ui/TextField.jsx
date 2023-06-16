import TextField from '@mui/material/TextField';
import React from 'react';
import { useField } from 'formik';

export default function TextfieldWrapper({ name, ...otherProps }) {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined'
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <TextField {...configTextfield} />;
}
