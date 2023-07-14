import React from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

/**
 * The DateTimePicker component is a custom React component that renders a TextField with specific props for handling date
 * and time input.
 * @returns a TextField component with the props specified in the configDateTimePicker object.
 */
export default function DateTimePicker(props) {
  const { name } = props;
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...props,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    }
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
}
