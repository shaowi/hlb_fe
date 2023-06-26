import { Box, Grid } from '@mui/material';
import ApplicantForm from 'components/forms/ApplicantForm';
import FileForm from 'components/forms/FileForm';
import FormButton from 'components/forms/FormButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useCreatePaymentStore } from './create_payment_store';
import {
  APPLICANT_DETAILS,
  APPLICANT_DETAILS_VALIDATION,
  MAIN_FILE_DETAILS,
  MAIN_FILE_DETAILS_VALIDATION
} from './form_templates';

export default function MainForm({ handleSubmit }) {
  const { applicantDetails } = useCreatePaymentStore();

  const INITIAL_FORM_STATE = {
    ...MAIN_FILE_DETAILS,
    ...APPLICANT_DETAILS
  };
  const FORM_VALIDATION = Yup.object({
    ...MAIN_FILE_DETAILS_VALIDATION,
    ...APPLICANT_DETAILS_VALIDATION
  });

  return (
    <Box sx={{ p: 3 }}>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        validateOnBlur={false}
        validationOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <FileForm />
            <ApplicantForm
              setFieldValue={setFieldValue}
              formData={applicantDetails}
            />
            <Grid container spacing={2} justifyContent="center" mt={1}>
              <Grid item>
                <FormButton label="Add Transaction" color="success" />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
