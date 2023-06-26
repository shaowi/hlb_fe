import { Box, Grid, ThemeProvider, createTheme } from '@mui/material';
import ApplicantForm from 'components/forms/ApplicantForm';
import BeneficiaryForm from 'components/forms/BeneficiaryForm';
import ChargeDetailsForm from 'components/forms/ChargeDetailsForm';
import CorrespondentBankDetailsForm from 'components/forms/CorrespondentBankDetailsForm';
import FileSubForm from 'components/forms/FileSubForm';
import FormButton from 'components/forms/FormButton';
import PaymentDetailsForm from 'components/forms/PaymentDetailsForm';
import TransactionDetailsForm from 'components/forms/TransactionDetailsForm';
import ResetButton from 'components/search_box/ResetButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useCreatePaymentStore } from './create_payment_store';
import {
  APPLICANT_DETAILS_VALIDATION,
  BENEFICIARY_DETAILS_VALIDATION,
  CHARGES_DETAILS_VALIDATION,
  CORRESPONDENT_BANK_DETAILS_VALIDATION,
  PAYMENT_DETAILS_VALIDATION,
  SUB_FILE_DETAILS_VALIDATION,
  TRANSACTION_DETAILS_VALIDATION
} from './form_templates';

export default function SubForm({ handleSubmit, setSubFormVisible }) {
  const FORM_VALIDATION = Yup.object({
    ...SUB_FILE_DETAILS_VALIDATION,
    ...APPLICANT_DETAILS_VALIDATION,
    ...BENEFICIARY_DETAILS_VALIDATION,
    ...PAYMENT_DETAILS_VALIDATION,
    ...CHARGES_DETAILS_VALIDATION,
    ...CORRESPONDENT_BANK_DETAILS_VALIDATION,
    ...TRANSACTION_DETAILS_VALIDATION
  });

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff'
      }
    }
  });

  const state = useCreatePaymentStore();
  const formData = state.currSubFormData;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Formik
              initialValues={formData}
              validationSchema={FORM_VALIDATION}
              validateOnBlur={false}
              validationOnChange={false}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <FileSubForm />
                  <ApplicantForm
                    isDisabled={true}
                    setFieldValue={setFieldValue}
                    formData={formData}
                  />
                  <BeneficiaryForm
                    setFieldValue={setFieldValue}
                    formData={formData}
                  />
                  <PaymentDetailsForm
                    setFieldValue={setFieldValue}
                    formData={formData}
                  />
                  <ChargeDetailsForm
                    formData={formData}
                    paymentCurrency={formData.remittanceCurrency.value}
                  />
                  <CorrespondentBankDetailsForm />
                  <TransactionDetailsForm />
                  <Grid container spacing={2} justifyContent="center" mt={1}>
                    <Grid item>
                      <FormButton
                        type="button"
                        label="Back"
                        color="neutral"
                        onClick={() => setSubFormVisible(false)}
                      />
                    </Grid>
                    <Grid item>
                      <ResetButton />
                    </Grid>
                    <Grid item>
                      <FormButton label="Save" color="success" />
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
