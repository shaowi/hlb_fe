import { Box, Grid } from '@mui/material';
import ApplicantForm from 'components/forms/ApplicantForm';
import FileForm from 'components/forms/FileForm';
import FormButton from 'components/forms/FormButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { APPLICANT_DETAILS_VALIDATION } from 'constants.js';

export default function MainForm({ handleSubmit, applicantDetails }) {
  const currentDate = new Date().toJSON().slice(0, 10);

  const FILE_DETAILS = {
    filename: `OPFR${currentDate.replace(/-/g, '')}0000001.csv`,
    debitType: 'single',
    channelTransactionReference: '2317333701OPZ00100',
    transactionType: 'ISS 1-M CBFT Credit Transfer (MT103)',
    requestChannel: 'PG BizOpsUI',
    transactionDate: currentDate,
    valueDate: currentDate,
    businessDate: currentDate,
    recipientReference: 'recipientReference',
    otherPaymentDetails: 'otherPaymentDetails'
  };

  const INITIAL_FORM_STATE = { ...FILE_DETAILS, ...applicantDetails };

  const FILE_DETAILS_VALIDATION = {
    filename: Yup.string().required('Filename is required'),
    debitType: Yup.string().required('Debit Type is required'),
    channelTransactionReference: Yup.string(),
    transactionType: Yup.string(),
    requestChannel: Yup.string(),
    transactionDate: Yup.date(),
    valueDate: Yup.date().required('Value Date is required'),
    businessDate: Yup.date().required('Business Date is required'),
    recipientReference: Yup.string(),
    otherPaymentDetails: Yup.string()
  };

  const FORM_VALIDATION = Yup.object({
    ...FILE_DETAILS_VALIDATION,
    ...APPLICANT_DETAILS_VALIDATION
  });

  return (
    <Box sx={{ p: 3 }}>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
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
