import FileOpenIcon from '@mui/icons-material/FileOpen';
import ActionButton from 'components/datatable/ActionButton';
import DataTable from 'components/datatable/index';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { formatToCurrency } from 'services/helper';
import SearchBox from './SearchBox';
import { STATUSES } from 'constants.js';
import { useState } from 'react';

const { all, rejected, failed, pending } = STATUSES;

const viewFileToolTipText = 'View File';

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
  },
  {
    id: 'businessDate',
    label: 'Business Date',
    minWidth: 170,
    sortable: true,
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'status',
    label: 'File Status',
    minWidth: 170,
    sortable: true
  }
];

const FETCHED_ROWS = [
  {
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton onClick={() => console.log('row 0 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000021.csv',
    debitType: 'Single Debit',
    transactionCount: 2,
    totalPaymentAmount: 19957.5,
    transactionDate: '2023-04-15',
    businessDate: '2023-05-15',
    status: rejected
  },
  {
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton onClick={() => console.log('row 1 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000022.csv',
    debitType: 'Multiple Debit',
    transactionCount: 2,
    totalPaymentAmount: 900.5,
    transactionDate: '2023-05-15',
    businessDate: '2023-06-15',
    status: failed
  },
  {
    action: (
      <ToolTipWrapper title={viewFileToolTipText}>
        <ActionButton onClick={() => console.log('row 2 clicked')}>
          <FileOpenIcon />
        </ActionButton>
      </ToolTipWrapper>
    ),
    filename: 'OPFR202305150000023.csv',
    debitType: 'Single Debit',
    transactionCount: 2,
    totalPaymentAmount: 800.5,
    transactionDate: '2023-05-15',
    businessDate: '2023-06-15',
    status: pending
  }
];

export default function RejectedPaymentMain() {
  const [rows, setRows] = useState(FETCHED_ROWS);

  function filterTableRecords(values) {
    console.log(values);
    setRows(
      rows.filter((row) => {
        const matchFilename =
          values.filename === '' ||
          row.filename.toLowerCase().includes(values.filename.toLowerCase());
        const matchStatus =
          values.status === all ||
          row.status.toLowerCase().includes(values.status.toLowerCase());
        const withinBusinessDate =
          row.businessDate >= values.businessDateFrom &&
          row.businessDate <= values.businessDateTo;
        const withinTransactionDate =
          (values.transactionDateFrom === '' &&
            values.transactionDateTo === '') ||
          (row.transactionDate >= values.transactionDateFrom &&
            row.transactionDate <= values.transactionDateTo);
        return (
          matchFilename &&
          matchStatus &&
          withinBusinessDate &&
          withinTransactionDate
        );
      })
    );
  }

  return (
    <>
      <SearchBox onSearch={filterTableRecords} />
      <DataTable title="Pending Action" columns={columns} rows={rows} />
    </>
  );
}
