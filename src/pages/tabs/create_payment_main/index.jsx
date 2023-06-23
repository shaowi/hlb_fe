import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid } from '@mui/material';
import ActionButton from 'components/datatable/ActionButton';
import DataTable from 'components/datatable/index';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { useState } from 'react';
import { formatToCurrency } from 'services/helper';
import MainForm from './MainForm';
import SubForm from './SubForm';

const transactionColumns = [
  { id: 'action', label: 'Action', minWidth: 160, sortable: false },
  {
    id: 'channelTransactionReference',
    label: 'Channel Transaction Reference',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'processingMode',
    label: 'Processing Mode',
    minWidth: 100,
    sortable: true
  },
  {
    id: 'beneficiaryAccountName',
    label: 'Beneficiary Account Name',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'beneficiaryAccountNo',
    label: 'Beneficiary Account Number',
    minWidth: 120,
    sortable: true
  },
  {
    id: 'beneficiaryBankName',
    label: 'Beneficiary Bank Name',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'beneficiaryAccountBic',
    label: 'Beneficiary Account Bic',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'remittanceAmount',
    label: 'Remittance Amount',
    minWidth: 120,
    sortable: true,
    format: (value) => formatToCurrency(value)
  },
  {
    id: 'fxContractReferenceNo',
    label: 'FX Contract Reference Number',
    minWidth: 170,
    sortable: true
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
  const APPLICANT_DETAILS = {
    applicantName: 'John Doe',
    applicantAccountNo: '9000000001',
    applicantAccountType: 'Current',
    applicantAccountCurrency: 'AUD',
    applicantIdType: 'New IC',
    applicantId: 'applicantId',
    applicantAccountBranchCode: '90',
    applicantBankBic: 'HLBBSGS0XXX',
    applicantResidentCode: 'resident',
    applicantAccountCifId: 'applicantAccountCifId',
    applicantPhone: '12345678',
    applicantPostalCode: '123456',
    applicantAddress1: 'applicantAddress1',
    applicantAddress2: 'applicantAddress2',
    applicantAddress3: 'applicantAddress3',
    // TODO: Move this to constants.js
    // Data used for testing only
    // applicantCountryCode: { label: '', value: '' }
    applicantCountryCode: { label: 'AU - Australia', value: 'AU' }
  };

  const [subFormVisible, setSubFormVisible] = useState(true);
  const [applicantDetails, setApplicantDetails] = useState(APPLICANT_DETAILS);

  const showSubForm = (values) => {
    console.log(values);
    setApplicantDetails(values);
    setSubFormVisible(true);
  };

  const addTransaction = (values) => {
    console.log(values);
  };

  return (
    <Box spacing={2} xs={{ p: 3, mb: 5 }}>
      {subFormVisible ? (
        <SubForm
          handleSubmit={addTransaction}
          applicantDetails={applicantDetails}
        />
      ) : (
        <>
          <MainForm
            handleSubmit={showSubForm}
            applicantDetails={applicantDetails}
          />
          <DataTable
            title="Transaction Details"
            rows={transactionRows}
            columns={transactionColumns}
          />
        </>
      )}
    </Box>
  );
}
