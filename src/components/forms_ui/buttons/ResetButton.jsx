import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

/**
 * The ResetButton component is a button that resets a form if it is dirty.
 * @returns a React component that renders a button. The button is disabled if the form is not dirty (i.e., no changes have
 * been made), and when clicked, it calls the `resetForm` function from the Formik context to reset the form. The button is
 * styled with a red color and labeled "Reset".
 */
export default function ResetButton() {
  //access formik context to check if the form is dirty.
  const { dirty, resetForm } = useFormikContext();
  return (
    <Button
      type="submit"
      variant="contained"
      color="error"
      disabled={!dirty}
      onClick={resetForm}
    >
      Reset
    </Button>
  );
}
