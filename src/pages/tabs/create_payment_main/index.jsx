import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid } from '@mui/material';
import ActionButton from 'components/datatable/ActionButton';
import DataTable from 'components/datatable/index';
import ApplicantForm from 'components/forms/ApplicantForm';
import FileForm from 'components/forms/FileForm';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { Form, Formik } from 'formik';
import { formatToCurrency } from 'services/helper';
import * as Yup from 'yup';

const currentDate = new Date().toJSON().slice(0, 10);

const FILE_DETAILS = {
  filename: '',
  debitType: '',
  channelTransactionReference: '',
  transactionType: '',
  requestChannel: '',
  transactionDate: currentDate,
  valueDate: currentDate,
  businessDate: currentDate,
  recipientReference: '',
  otherPaymentDetails: ''
};

const APPLICANT_DETAILS = {
  applicantName: '',
  applicantAccountNo: '',
  applicantAccountType: '',
  applicantAccountCurrency: '',
  applicantIdType: '',
  applicantId: '',
  applicantAccountBranchCode: '',
  applicantBankBic: '',
  applicantResidentCode: '',
  applicantAccountCifId: '',
  applicantPhone: '',
  applicantPostalCode: '',
  applicantAddress1: '',
  applicantAddress2: '',
  applicantAddress3: '',
  applicantCountryCode: ''
};

const INITIAL_FORM_STATE = { ...FILE_DETAILS, ...APPLICANT_DETAILS };

const FILE_DETAILS_VALIDATION = {
  filename: Yup.string(),
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
  applicantAddress3: Yup.string(),
  applicantCountryCode: Yup.string().required('Country Code is required')
};

const FORM_VALIDATION = Yup.object().shape({
  ...FILE_DETAILS_VALIDATION,
  ...APPLICANT_DETAILS_VALIDATION
});

const transactionColumns = [
  { id: 'action', label: 'Action', minWidth: 160 },
  {
    id: 'channelTransactionReference',
    label: 'Channel Transaction Reference',
    minWidth: 170
  },
  {
    id: 'processingMode',
    label: 'Processing Mode',
    minWidth: 100
  },
  {
    id: 'beneficiaryAccountName',
    label: 'Beneficiary Account Name',
    minWidth: 170
  },
  {
    id: 'beneficiaryAccountNo',
    label: 'Beneficiary Account Number',
    minWidth: 120
  },
  {
    id: 'beneficiaryBankName',
    label: 'Beneficiary Bank Name',
    minWidth: 170
  },
  {
    id: 'beneficiaryAccountBic',
    label: 'Beneficiary Account Bic',
    minWidth: 170
  },
  {
    id: 'remittanceAmount',
    label: 'Remittance Amount',
    minWidth: 120,
    format: (value) => formatToCurrency(value)
  },
  {
    id: 'fxContractReferenceNo',
    label: 'FX Contract Reference Number',
    minWidth: 170
  }
];

const transactionRows = [
  createData({
    action: (
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <ToolTipWrapper title="Edit">
            <ActionButton
              size="small"
              onClick={() => console.log('transaction details row 0:edit')}
            >
              <EditIcon />
            </ActionButton>
          </ToolTipWrapper>
        </Grid>
        <Grid item xs={6}>
          <ToolTipWrapper title="Delete">
            <ActionButton
              size="small"
              color="error"
              onClick={() => console.log('transaction details row 0:delete')}
            >
              <DeleteIcon />
            </ActionButton>
          </ToolTipWrapper>
        </Grid>
      </Grid>
    ),
    channelTransactionReference: '123456789',
    processingMode: 'Normal',
    beneficiaryAccountName: 'John Doe',
    beneficiaryAccountNo: '123456789',
    beneficiaryBankName: 'Bank of America',
    beneficiaryAccountBic: '123456789',
    remittanceAmount: 1000,
    fxContractReferenceNo: '123456789'
  })
];

function createData({
  action,
  channelTransactionReference,
  processingMode,
  beneficiaryAccountName,
  beneficiaryAccountNo,
  beneficiaryBankName,
  beneficiaryAccountBic,
  remittanceAmount,
  fxContractReferenceNo
}) {
  return {
    action,
    channelTransactionReference,
    processingMode,
    beneficiaryAccountName,
    beneficiaryAccountNo,
    beneficiaryBankName,
    beneficiaryAccountBic,
    remittanceAmount,
    fxContractReferenceNo
  };
}

export default function CreatePaymentMain() {
  const addTransaction = (values) => {
    console.log(values);
  };

  return (
    <Grid container direction="column" spacing={2} p={3} mb={5}>
      <Box sx={{ p: 3 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Formik
              initialValues={INITIAL_FORM_STATE}
              validationSchema={FORM_VALIDATION}
              onSubmit={addTransaction}
            >
              <Form>
                <FileForm />
                <ApplicantForm />
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Box>
      <DataTable
        title="Transaction Details"
        rows={transactionRows}
        columns={transactionColumns}
      />
    </Grid>
  );
}
