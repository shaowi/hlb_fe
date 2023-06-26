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
import ChargeDetailsForm from 'components/forms/ChargeDetailsForm';
import CorrespondentBankDetailsForm from 'components/forms/CorrespondentBankDetailsForm';
import TransactionDetailsForm from 'components/forms/TransactionDetailsForm';
import { useCreatePaymentStore } from './create_payment_store';

export default function SubForm({ handleSubmit, setSubFormVisible }) {
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

  const CHARGES_DETAILS_VALIDATION = {
    creditMidRate: Yup.number(),
    debitMidRate: Yup.number(),
    chargeBearer: Yup.string().required('Charge Bearer is required'),
    commissionInLieuOfExchange: Yup.number()
  };

  const CORRESPONDENT_BANK_DETAILS_VALIDATION = {
    sendersCorrespondent: Yup.string().required(
      "Sender's Correspondent is required"
    ),
    receiversCorrespondent: Yup.string().required(
      "Receiver's Correspondent is required"
    )
  };

  const TRANSACTION_DETAILS_VALIDATION = {
    channelTransactionReference: Yup.string(),
    recipientReference: Yup.string(),
    purposeCode: Yup.string(),
    remittanceInfo: Yup.string(),
    additionalRemittanceInfo: Yup.string(),
    senderToReceiverInfo: Yup.string(),
    additionalSenderToReceiverInfo: Yup.string(),
    otherPaymentDetails: Yup.string(),
    additionalRemarks: Yup.string()
  };

  const FORM_VALIDATION = Yup.object({
    ...FILE_DETAILS_VALIDATION,
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
