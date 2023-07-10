import { useEffect, useRef } from 'react';

export function usePropagateRef(props) {
  const { name, value, setFieldValue } = props;
  /**
   * Extracted from: https://github.com/superjose/increase-formik-performance-react.git
   * This is a special useRef that is used to propagate Formik's changes
   * to the component (the other way around that is done).
   *
   * This needs to be done whenever the name property changes and the content of the
   * component remains the same.
   *
   * An example is when you have a dynamic view that changes the TextField's name attribute.
   * If we don't do this, the useBlur hook will overwrite the value that you left before you
   * changed the TextField's value.
   *
   */
  const flagRef = useRef(true);
  useEffect(() => {
    if (flagRef.current) {
      flagRef.current = false;
      return;
    }

    setFieldValue(value);
    // eslint-disable-next-line
  }, [name]);
}
