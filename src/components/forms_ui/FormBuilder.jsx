import { Grid, InputAdornment, Autocomplete } from '@mui/material';
import FormButton from 'components/forms/FormButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import SelectField from './Select';
import DateTimePicker from './DateTimePicker';
import ToolTipWrapper from './ToolTipWrapper';

/* FormBuilder builds a form with formik based on the given formAttributes

formAttributes is an object with two properties: rows and buttons
  - rows is an array of objects with a fields property
  - each field has a type, defaultValue and a componentProps property
    - type: text, select, date
    - defaultValue: string, number, date
    - componentProps: props to be passed to the component
    - toolTipProps: props to be passed to the ToolTipWrapper component

handleSubmit is a function that takes the form values as an argument which is called when the form is submitted

Notes:
  - Max fields per row = 4
  - isReset property can be given to any button to make it a reset button
*/
export default function FormBuilder({ onSubmit, formAttributes }) {
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
        const fieldType = field.type;
        if (fieldType === 'select-autocomplete') {
          return;
        }
        const yupType = fieldType === 'date' ? Yup.date() : Yup.string();
        const isRequired = field.componentProps.required;
        formValidation[field.componentProps.name] = isRequired
          ? yupType.required(`${field.componentProps.label} is required`)
          : yupType;
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
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2}>
            {formAttributes.rows.map((row, indexA) => {
              const fields = row.fields.slice(0, 4);
              const fieldCount = fields.length;
              const fieldSize = 12 / fieldCount;
              return (
                <Grid key={indexA} item container spacing={2}>
                  {fields.map((field, indexB) => {
                    const fieldComponent =
                      field.type === 'text' ? (
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
                      ) : field.type === 'select' ? (
                        <SelectField {...field.componentProps} />
                      ) : field.type === 'select-autocomplete' ? (
                        <Autocomplete
                          {...field.componentProps}
                          defaultValue={
                            field.defaultValue.value === ''
                              ? null
                              : field.defaultValue
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                          }
                          getOptionLabel={(option) => option.label}
                          onChange={(e, value) => {
                            setFieldValue(
                              field.componentProps.name,
                              value !== null ? value : field.defaultValue
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              name={field.componentProps.name}
                              label={field.componentProps.label}
                            />
                          )}
                        />
                      ) : field.type === 'date' ? (
                        <DateTimePicker {...field.componentProps} />
                      ) : null;

                    return (
                      <Grid key={`${indexA}, ${indexB}`} item xs={fieldSize}>
                        {field.toolTipProps ? (
                          <ToolTipWrapper {...field.toolTipProps}>
                            {fieldComponent}
                          </ToolTipWrapper>
                        ) : (
                          fieldComponent
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              );
            })}
            {formAttributes.buttons && (
              <Grid
                item
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                {formAttributes.buttons.map((buttonProps, index) => {
                  return (
                    <Grid key={index} item>
                      <FormButton {...buttonProps} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
