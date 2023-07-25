import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  InputAdornment,
  Typography
} from '@mui/material';
import FormButton from 'components/forms_ui/FormButton';
import { ConnectedFocusError } from 'focus-formik-error';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from './DateTimePicker';
import SelectField from './Select';
import TextField from './TextField';
import ToolTipWrapper from './ToolTipWrapper';

export const FORM_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  SELECT_AUTOCOMPLETE: 'select-autocomplete',
  DATE: 'date',
  LABEL: 'label'
};

const { TEXT, SELECT, SELECT_AUTOCOMPLETE, DATE, LABEL } = FORM_TYPES;

/**
 * The `FormBuilder` component is a form builder which builds a form with formik. It takes in form attributes, creates initial form state and form
 * validation, and renders a form using Formik and various form fields.
 * @returns The function `FormBuilder` is returning a JSX element.
 */
export default function FormBuilder(props) {
  const { onSubmit, formAttributes, id = -1, formikRef = null } = props;

  function createInitialFormState(data) {
    const initialFormState = {};
    data.sections.forEach((section) => {
      section.rows.forEach((row) => {
        row.fields.forEach((field) => {
          if (field.type !== LABEL) {
            initialFormState[field.componentProps.name] = field.defaultValue;
          }
        });
      });
    });
    return initialFormState;
  }

  function createFormValidation(data) {
    function setRequiredValidation(field, yupType) {
      if (field.componentProps.required) {
        return yupType.required(`${field.componentProps.label} is required`);
      }
      return yupType;
    }
    function setDateComparisonValidation(field, yupType) {
      if (field.type === DATE && field.validateDateComparison) {
        return yupType.when(
          field.validateDateComparison.other,
          field.validateDateComparison.func
        );
      }
      return yupType;
    }
    function setEqualityValidation(field, yupType) {
      if (field.validateEquality) {
        const { other, shouldBeEqual, errorMessage } = field.validateEquality;
        const otherValues = [Yup.ref(other)];
        return shouldBeEqual
          ? yupType.oneOf(otherValues, errorMessage)
          : yupType.notOneOf(otherValues, errorMessage);
      }
      return yupType;
    }
    const formValidation = {};
    data.sections.forEach((section) => {
      section.rows.forEach((row) => {
        row.fields.forEach((field) => {
          const fieldType = field.type;
          if (fieldType === LABEL || fieldType === SELECT_AUTOCOMPLETE) {
            return;
          }
          let yupType = fieldType === DATE ? Yup.date() : Yup.string();
          yupType = setRequiredValidation(field, yupType);
          yupType = setDateComparisonValidation(field, yupType);
          yupType = setEqualityValidation(field, yupType);
          formValidation[field.componentProps.name] = yupType;
        });
      });
    });
    return Yup.object(formValidation);
  }

  const INITIAL_FORM_STATE = createInitialFormState(formAttributes);

  const FORM_VALIDATION = createFormValidation(formAttributes);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ ...INITIAL_FORM_STATE, id }}
      validationSchema={FORM_VALIDATION}
      validationOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
      innerRef={formikRef}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <ConnectedFocusError />
            {formAttributes.sections.map((section, indexA) => {
              if (section.hidden) {
                return <div key={indexA}></div>;
              }
              return (
                <Box key={indexA} sx={{ mt: 3 }}>
                  <Grid container direction="column" spacing={2}>
                    {section.title && (
                      <Grid item container direction="column" spacing={1}>
                        <Grid item alignItems="center">
                          <Typography variant={section.title.variant}>
                            {section.title.value}
                          </Typography>
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
                          alignItems="center"
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
                                    field.defaultValue?.value === ''
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
                                      value !== null
                                        ? value
                                        : field.defaultValue
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
                              ) : field.type === LABEL ? (
                                <Typography {...field.componentProps}>
                                  {field.defaultValue}
                                </Typography>
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
                </Box>
              );
            })}
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
                    <Grid
                      key={index}
                      item
                      xs={buttonProps.componentProps?.fullWidth ? 12 : 0}
                    >
                      <FormButton {...buttonProps} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
