import { Box } from '@mui/material';
import DataTable from 'components/datatable';
import ConfirmationSummaryForm from './ConfirmationSummaryForm';
import MainForm from './MainForm';
import { transactionColumns } from './payment_store';

/**
 * The ConfirmationPage function is a React component that renders a confirmation page with transaction details and a
 * summary form.
 * @returns a JSX element.
 */
export default function ConfirmationPage(props) {
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
    paymentAmount,
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
      paymentAmount,
      fxContractReferenceNo
    };
  }

  const mainFormProps = {
    ...props,
    disabled: true
  };

  const dataTableProps = {
    title: 'Transaction Details',
    rows: actionlessTransactionRows,
    columns
  };

  const confirmationSummaryFormProps = {
    transactionRows: actionlessTransactionRows,
    ...props
  };

  return (
    <Box spacing={2} xs={{ p: 3, mb: 5 }}>
      <MainForm {...mainFormProps} />
      <DataTable {...dataTableProps} />
      <ConfirmationSummaryForm {...confirmationSummaryFormProps} />
    </Box>
  );
}
