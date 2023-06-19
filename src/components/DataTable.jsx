import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import Typography from '@mui/material/Typography';
import { formatToCurrency } from './../services/helper';

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

const rows = [
  createData(
    '',
    'OPFR202305150000021.csv',
    'Single Debit',
    2,
    19957.5,
    '2023-05-15'
  ),
  createData(
    '',
    'OPFR202305150000022.csv',
    'Multiple Debit',
    2,
    957.5,
    '2023-05-15'
  )
];

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('filename');

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleChangePage = (event, newPage) => {
    console.log('newPage', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('event.target.value', event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography sx={{ p: 3 }} variant="h4">
        Pending Action
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id + index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={(e) => handleRequestSort(e, column.id)}
                  >
                    <Typography fontWeight="bold">{column.label}</Typography>
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, indexA) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={indexA}>
                  {columns.map((column, indexB) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id + indexB} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="grandchildren-no-mb"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
