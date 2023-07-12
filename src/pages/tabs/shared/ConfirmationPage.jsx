import { Box } from '@mui/material';
import DataTable from 'components/datatable';
import ConfirmationSummaryForm from './ConfirmationSummaryForm';
import MainForm from './MainForm';
import { transactionColumns } from './payment_store';

export default function ConfirmationPage({ ...props }) {
  const { subFormDataList } = props;
  const actionlessTransactionRows = subFormDataList.map(mapToRow);
  const columns = transactionColumns.slice(1);

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
      <MainForm disabled={true} {...props} />
      <DataTable
        title="Transaction Details"
        rows={actionlessTransactionRows}
        columns={columns}
      />
      <ConfirmationSummaryForm
        transactionRows={actionlessTransactionRows}
        {...props}
      />
    </Box>
  );
}
