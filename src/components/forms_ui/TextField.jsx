import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import { usePropagateRef } from './usePropagateRef';

/**
 * This is a React component that wraps a TextField component and handles performance optimizations for heavy views.
 * @returns a TextField component with the props configured based on the input props and the performanceProps.
 */
export default function TextfieldWrapper(props) {
  const { name, type } = props;
  const [field, meta] = useField(name);

  /**
   * Extracted and modified from: https://github.com/superjose/increase-formik-performance-react.git
   * For performance reasons (possible due to CSS in JS issues), heavy views
   * affect re-renders (Formik changes state in every re-render), bringing keyboard
   * input to its knees. To control this, we create a setState that handles the field's inner
   * (otherwise you wouldn't be able to type) and then propagate the change to Formik onBlur and
   * onFocus.
   */
  const { value } = field;
  const [fieldValue, setFieldValue] = useState(value);
  const { disablePerformance, loading, afterChange, ...otherProps } = props;
  usePropagateRef({
    setFieldValue,
    name,
    value
  });

  /**
   * Using this useEffect guarantees us that pre-filled forms
   * such as passwords work.
   */
  useEffect(() => {
    if (meta.touched) {
      return;
    }

    if (field.value !== fieldValue) {
      setFieldValue(value);
    }
    // eslint-disable-next-line
  }, [value]);

  const onChange = (evt) => {
    setFieldValue(evt.target.value);
  };
  const onBlur = (evt) => {
    const val = evt.target.value || '';
    if (val !== field.value && afterChange) {
      afterChange(field.value, val);
    }
    setTimeout(() => {
      field.onChange({
        target: {
          name,
          value: type === 'number' ? parseInt(val, 10) : val
        }
      });
    }, 0);
  };

  // Will set depending on the performance props
  const performanceProps = disablePerformance
    ? {
        ...field,
        value: loading ? 'Loading...' : fieldValue
      }
    : {
        ...field,
        value: loading ? 'Loading...' : fieldValue,
        onChange,
        onBlur
      };

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined'
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield} {...performanceProps} />;
}
