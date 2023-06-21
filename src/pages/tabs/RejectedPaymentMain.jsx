import React from 'react';
import Grid from '@mui/material/Grid';
import SearchBox from './../../components/search_box/index';
import DataTable from './../../components/datatable/index';
import { formatToCurrency } from './../../services/helper';
import ActionButton from './../../components/datatable/ActionButton';

const columns = [
  { id: 'action', label: 'Action', minWidth: 100 },
  { id: 'filename', label: 'Filename', minWidth: 170 },
  {
    id: 'debitType',
    label: 'Debit Type',
    minWidth: 170
  },
  {
    id: 'transactionCount',
    label: 'Total Transaction Count',
    minWidth: 120
  },
  {
    id: 'totalPaymentAmount',
    label: 'Total Payment Amount',
    minWidth: 170,
    format: (value) => formatToCurrency(value)
  },
  {
    id: 'transactionDate',
    label: 'Transaction Date',
    minWidth: 170,
    format: (value) => value.toLocaleString('en-US')
  }
];

const rows = [
  createData(
    <ActionButton handleClick={() => console.log('row 0 clicked')} />,
    'OPFR202305150000021.csv',
    'Single Debit',
    2,
    19957.5,
    '2023-05-15'
  ),
  createData(
    <ActionButton handleClick={() => console.log('row 1 clicked')} />,
    'OPFR202305150000022.csv',
    'Multiple Debit',
    2,
    957.5,
    '2023-05-15'
  ),
  createData(
    <ActionButton handleClick={() => console.log('row 2 clicked')} />,
    'OPFR202305150000023.csv',
    'Single Debit',
    2,
    1000,
    '2023-05-15'
  )
];

function createData(
  action,
  filename,
  debitType,
  transactionCount,
  totalPaymentAmount,
  transactionDate
) {
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
      <DataTable columns={columns} rows={rows} />
    </Grid>
  );
}
