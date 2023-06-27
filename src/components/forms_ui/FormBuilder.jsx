import { Grid, InputAdornment } from '@mui/material';
import FormButton from 'components/forms/FormButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';

export default function FormBuilder({ handleSubmit, formAttributes }) {
  function createInitialFormState(data) {
    const initialFormState = {};
    data.rows.forEach((row) => {
      row.fields.forEach((field) => {
        initialFormState[field.componentProps.name] = field.defaultValue;
      });
    });
    return initialFormState;
  }

  function createFormValidation(data) {
    const formValidation = {};
    data.rows.forEach((row) => {
      row.fields.forEach((field) => {
        formValidation[field.componentProps.name] = Yup.string().required(
          `${field.componentProps.label} is required`
        );
      });
    });
    return Yup.object(formValidation);
  }

  const INITIAL_FORM_STATE = createInitialFormState(formAttributes);

  const FORM_VALIDATION = createFormValidation(formAttributes);

  return (
    <Formik
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      validateOnBlur={false}
      validationOnChange={false}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid container spacing={2}>
          {formAttributes.rows.map((row, indexA) => {
            const fields = row.fields.slice(0, 4);
            const fieldCount = fields.length;
            const fieldSize = 12 / fieldCount;
            return (
              <Grid key={indexA} item container spacing={2}>
                {fields.map((field, indexB) => (
                  <Grid key={`${indexA}, ${indexB}`} item xs={fieldSize}>
                    {field.type === 'text' && (
                      <TextField
                        {...field.componentProps}
                        InputProps={
                          field.icon && {
                            startAdornment: (
                              <InputAdornment position="start">
                                {field.icon}
                              </InputAdornment>
                            )
                          }
                        }
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            );
          })}
          <Grid item container spacing={2}>
            {formAttributes.buttons.map((buttonProps, index) => {
              const buttonCount = formAttributes.buttons.length;
              const buttonSize = Math.floor(12 / buttonCount);
              return (
                <Grid key={index} item xs={buttonSize}>
                  <FormButton {...buttonProps} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
