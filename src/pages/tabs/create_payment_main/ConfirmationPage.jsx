import { Box } from '@mui/material';
import DataTable from 'components/datatable';
import { formatToCurrency } from 'services/helper';
import MainForm from './MainForm';
import { useCreatePaymentStore } from './create_payment_store';
import ConfirmationSummaryForm from './ConfirmationSummaryForm';

const transactionColumns = [
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
    id: 'beneficiaryName',
    label: 'Beneficiary Name',
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

export default function ConfirmationPage({ setShowConfirmationPage }) {
  const { currMainFormData, subFormDataList } = useCreatePaymentStore();
  const transactionRows = subFormDataList.map(mapToRow);

  function mapToRow({
    channelTransactionReference,
    processingMode,
    beneficiaryName,
    beneficiaryAccountNo,
    beneficiaryBankName,
    beneficiaryAccountBic,
    remittanceAmount,
    fxContractReferenceNo
  }) {
    return {
      channelTransactionReference,
      processingMode,
      beneficiaryName,
      beneficiaryAccountNo,
      beneficiaryBankName,
      beneficiaryAccountBic: beneficiaryAccountBic?.value,
      remittanceAmount,
      fxContractReferenceNo
    };
  }

  return (
    <Box spacing={2} xs={{ p: 3, mb: 5 }}>
      <MainForm mainFileDetails={currMainFormData} disabled={true} />
      <DataTable
        title="Transaction Details"
        rows={transactionRows}
        columns={transactionColumns}
      />
      <ConfirmationSummaryForm
        transactionRows={transactionRows}
        setShowConfirmationPage={setShowConfirmationPage}
      />
    </Box>
  );
}
