import React from 'react';
import { Box, Grid, createTheme, ThemeProvider } from '@mui/material';
import { Form, Formik } from 'formik';
import ApplicantForm from 'components/forms/ApplicantForm';
import * as Yup from 'yup';
import FileSubForm from 'components/forms/FileSubForm';
import FormButton from 'components/forms/FormButton';

export default function SubForm({ handleSubmit, applicantDetails }) {
  const FILE_DETAILS = {
    debitType: '',
    transactionType: '',
    processingMode: ''
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
    beneficiaryCountryCode: ''
  };

  const INITIAL_FORM_STATE = {
    ...FILE_DETAILS,
    ...applicantDetails,
    ...BENEFICIARY_DETAILS
  };

  const FILE_DETAILS_VALIDATION = {
    debitType: Yup.string(),
    transactionType: Yup.string(),
    processingMode: Yup.string()
  };

  const APPLICANT_DETAILS_VALIDATION = {
    applicantName: Yup.string().required('Name is required'),
    applicantAccountNo: Yup.number().required('Account No is required'),
    applicantAccountType: Yup.string().required('Account Type is required'),
    applicantAccountCurrency: Yup.string().required(
      'Account Currency is required'
    ),
    applicantIdType: Yup.string(),
    applicantId: Yup.string(),
    applicantAccountBranchCode: Yup.string().required(
      'Account Branch Code is required'
    ),
    applicantBankBic: Yup.string(),
    applicantResidentCode: Yup.string().required('Resident Code is required'),
    applicantAccountCifId: Yup.string(),
    applicantPhone: Yup.number().integer().typeError('Phone must be a number'),
    applicantPostalCode: Yup.string(),
    applicantAddress1: Yup.string().required('Address 1 is required'),
    applicantAddress2: Yup.string(),
    applicantAddress3: Yup.string()
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

  const FORM_VALIDATION = Yup.object().shape({
    ...FILE_DETAILS_VALIDATION,
    ...APPLICANT_DETAILS_VALIDATION,
    ...BENEFICIARY_DETAILS_VALIDATION
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
                  <Grid container spacing={2} justifyContent="center" mt={1}>
                    <Grid item>
                      <FormButton label="Back" color="neutral" />
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
