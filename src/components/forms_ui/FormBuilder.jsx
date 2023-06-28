import {
  Grid,
  InputAdornment,
  Autocomplete,
  Divider,
  Typography,
  Paper
} from '@mui/material';
import FormButton from 'components/forms/FormButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import SelectField from './Select';
import DateTimePicker from './DateTimePicker';
import ToolTipWrapper from './ToolTipWrapper';

/* FormBuilder builds a form with formik based on the given formAttributes

formAttributes is an object with 2 required properties: sections and buttons. In section property, it has 1 required and 1 optional property which are rows and title respectively.
  - sections is an array of objects with a rows and optional title property
  - rows is an array of objects with a fields property
  - each field has a type, defaultValue and a componentProps property
    - type: text, select, select-autocomplete, date
    - defaultValue: string, number, date
    - componentProps: props to be passed to the component
    - toolTipProps: props to be passed to the ToolTipWrapper component

handleSubmit is a function that takes the form values as an argument which is called when the form is submitted

Notes:
  - Max fields per row = 4
  - isReset property can be given to any button to make it a reset button
  - id is a hidden field
*/
export const FORM_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  SELECT_AUTOCOMPLETE: 'select-autocomplete',
  DATE: 'date'
};

const { TEXT, SELECT, SELECT_AUTOCOMPLETE, DATE } = FORM_TYPES;

export default function FormBuilder({ onSubmit, formAttributes, id }) {
  function createInitialFormState(data) {
    const initialFormState = {};
    data.sections.forEach((section) => {
      section.rows.forEach((row) => {
        row.fields.forEach((field) => {
          initialFormState[field.componentProps.name] = field.defaultValue;
        });
      });
    });
    return initialFormState;
  }

  function createFormValidation(data) {
    const formValidation = {};
    data.sections.forEach((section) => {
      section.rows.forEach((row) => {
        row.fields.forEach((field) => {
          const fieldType = field.type;
          if (fieldType === SELECT_AUTOCOMPLETE) {
            return;
          }
          const yupType = fieldType === DATE ? Yup.date() : Yup.string();
          const isRequired = field.componentProps.required;
          formValidation[field.componentProps.name] = isRequired
            ? yupType.required(`${field.componentProps.label} is required`)
            : yupType;
        });
      });
    });
    return Yup.object(formValidation);
  }

  const INITIAL_FORM_STATE = createInitialFormState(formAttributes);

  const FORM_VALIDATION = createFormValidation(formAttributes);

  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE, id }}
      validationSchema={FORM_VALIDATION}
      validateOnBlur={false}
      validationOnChange={false}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          {formAttributes.sections.map((section, indexA) => (
            <Paper
              key={indexA}
              sx={{ width: '100%', overflow: 'hidden', p: 5, mt: 3 }}
            >
              <Grid container direction="column" spacing={2}>
                {section.title && (
                  <Grid item container direction="column" spacing={1}>
                    <Grid item alignItems="center">
                      <Typography variant="h5">{section.title}</Typography>
                    </Grid>
                    <Grid item>
                      <Divider />
                    </Grid>
                  </Grid>
                )}
                {section.rows.map((row, indexB) => {
                  const fields = row.fields.slice(0, 4);
                  const fieldCount = fields.length;
                  const fieldSize = 12 / fieldCount;
                  return (
                    <Grid
                      key={`${indexA}, ${indexB}`}
                      item
                      container
                      spacing={2}
                    >
                      {fields.map((field, indexC) => {
                        const fieldComponent =
                          field.type === TEXT ? (
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
                          ) : field.type === SELECT ? (
                            <SelectField {...field.componentProps} />
                          ) : field.type === SELECT_AUTOCOMPLETE ? (
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
                          ) : field.type === DATE ? (
                            <DateTimePicker {...field.componentProps} />
                          ) : null;

                        return (
                          <Grid
                            key={`${indexA}, ${indexB}, ${indexC}`}
                            item
                            xs={fieldSize}
                          >
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
              </Grid>
            </Paper>
          ))}
          {formAttributes.buttons && (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              mt={1}
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
        </Form>
      )}
    </Formik>
  );
}
