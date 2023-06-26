import FileOpenIcon from '@mui/icons-material/FileOpen';
import Grid from '@mui/material/Grid';
import ActionButton from 'components/datatable/ActionButton';
import DataTable from 'components/datatable/index';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import SearchBox from 'components/search_box/index';
import { formatToCurrency } from 'services/helper';

const columns = [
  { id: 'action', label: 'Action', minWidth: 100, sortable: false },
  { id: 'filename', label: 'Filename', minWidth: 170, sortable: true },
  {
    id: 'debitType',
    label: 'Debit Type',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'transactionCount',
    label: 'Total Transaction Count',
    minWidth: 120,
    sortable: true
  },
  {
    id: 'totalPaymentAmount',
    label: 'Total Payment Amount',
    minWidth: 170,
    sortable: true,
    format: (value) => formatToCurrency(value)
  },
  {
    id: 'transactionDate',
    label: 'Transaction Date',
    minWidth: 170,
    sortable: true,
    format: (value) => value.toLocaleString('en-US')
  }
];

const viewFileToolTipText = 'View File';

const rows = [
  createData({
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton handleClick={() => console.log('row 0 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000021.csv',
    debitType: 'Single Debit',
    transactionCount: 2,
    totalPaymentAmount: 19957.5,
    transactionDate: '2023-05-15'
  }),
  createData({
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton handleClick={() => console.log('row 1 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000022.csv',
    debitType: 'Multiple Debit',
    transactionCount: 2,
    totalPaymentAmount: 900.5,
    transactionDate: '2023-05-15'
  }),
  createData({
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton handleClick={() => console.log('row 2 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000023.csv',
    debitType: 'Single Debit',
    transactionCount: 2,
    totalPaymentAmount: 800.5,
    transactionDate: '2023-05-15'
  })
];

function createData({
  action,
  filename,
  debitType,
  transactionCount,
  totalPaymentAmount,
  transactionDate
}) {
  return {
    action,
    filename,
    debitType,
    transactionCount,
    totalPaymentAmount,
    transactionDate
  };
}

export default function RejectedPaymentMain() {
  return (
    <Grid container direction="column" spacing={2} p={3} mb={5}>
      <SearchBox />
      <DataTable title="Pending Action" columns={columns} rows={rows} />
    </Grid>
  );
}
