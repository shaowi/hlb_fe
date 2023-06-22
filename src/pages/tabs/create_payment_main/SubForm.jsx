import React from 'react';
import { Box, Grid, createTheme, ThemeProvider } from '@mui/material';
import { Form, Formik } from 'formik';
import ApplicantForm from 'components/forms/ApplicantForm';
import * as Yup from 'yup';
import FileSubForm from 'components/forms/FileSubForm';
import FormButton from 'components/forms/FormButton';
import ResetButton from 'components/search_box/ResetButton';
import { APPLICANT_DETAILS_VALIDATION } from 'constants.js';
import BeneficiaryForm from 'components/forms/BeneficiaryForm';
import PaymentDetailsForm from 'components/forms/PaymentDetailsForm';

export default function SubForm({ handleSubmit, applicantDetails }) {
  // TODO: Move this to constants.js
  // Data used for testing only
  const FILE_DETAILS = {
    debitType: 'single',
    transactionType: 'transactionType',
    processingMode: 'processingMode'
  };

  const BENEFICIARY_DETAILS = {
    beneficiaryName: '',
    beneficiaryAccountNo: '',
    beneficiaryIdType: '',
    beneficiaryId: '',
    beneficiaryResidentCode: '',
    beneficiaryAccountBic: '',
    beneficiaryBankName: '',
    beneficiaryBankCountryCode: '',
    beneficiaryBankAddress1: '',
    beneficiaryBankAddress2: '',
    beneficiaryBankAddress3: '',
    beneficiaryAddress1: '',
    beneficiaryAddress2: '',
    beneficiaryAddress3: '',
    beneficiaryCountryCode: { label: 'AU - Australia', value: 'AU' }
  };

  const PAYMENT_DETAILS = {
    remittanceCurrency: { label: 'AUD', value: 'AUD' },
    remittanceAmount: '',
    fxContractReferenceNo: '',
    exchangeRate: '',
    creditingFxRate: '',
    debitingFxRate: '',
    paymentCurrency: '',
    paymentAmount: '',
    localEquivalentAmount: ''
  };

  const INITIAL_FORM_STATE = {
    ...FILE_DETAILS,
    ...applicantDetails,
    ...BENEFICIARY_DETAILS,
    ...PAYMENT_DETAILS
  };

  const FILE_DETAILS_VALIDATION = {
    debitType: Yup.string(),
    transactionType: Yup.string(),
    processingMode: Yup.string()
  };

  const BENEFICIARY_DETAILS_VALIDATION = {
    beneficiaryName: Yup.string().required('Name is required'),
    beneficiaryAccountNo: Yup.number().required('Account No is required'),
    beneficiaryIdType: Yup.string(),
    beneficiaryId: Yup.string(),
    beneficiaryResidentCode: Yup.string().required('Resident Code is required'),
    beneficiaryAccountBic: Yup.string(),
    beneficiaryBankName: Yup.string(),
    beneficiaryBankCountryCode: Yup.string(),
    beneficiaryBankAddress1: Yup.string(),
    beneficiaryBankAddress2: Yup.string(),
    beneficiaryBankAddress3: Yup.string(),
    beneficiaryAddress1: Yup.string().required('Address 1 is required'),
    beneficiaryAddress2: Yup.string().required('Address 2 is required'),
    beneficiaryAddress3: Yup.string()
  };

  const PAYMENT_DETAILS_VALIDATION = {
    remittanceAmount: Yup.number().required('Remittance Amount is required'),
    fxContractReferenceNo: Yup.string(),
    exchangeRate: Yup.number(),
    creditingFxRate: Yup.number(),
    debitingFxRate: Yup.number(),
    paymentCurrency: Yup.string(),
    paymentAmount: Yup.number(),
    localEquivalentAmount: Yup.number()
  };

  const FORM_VALIDATION = Yup.object({
    ...FILE_DETAILS_VALIDATION,
    ...APPLICANT_DETAILS_VALIDATION,
    ...BENEFICIARY_DETAILS_VALIDATION,
    ...PAYMENT_DETAILS_VALIDATION
  });

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Formik
              initialValues={INITIAL_FORM_STATE}
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
                    formData={applicantDetails}
                  />
                  <BeneficiaryForm
                    setFieldValue={setFieldValue}
                    formData={BENEFICIARY_DETAILS}
                  />
                  <PaymentDetailsForm
                    setFieldValue={setFieldValue}
                    formData={PAYMENT_DETAILS}
                  />
                  <Grid container spacing={2} justifyContent="center" mt={1}>
                    <Grid item>
                      <FormButton label="Back" color="neutral" />
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
