import { Alert, Box, Grid, Typography } from '@mui/material';
import DataTable from 'components/datatable/index';
import FormButton from 'components/forms_ui/buttons/FormButton';
import { formatToCurrency } from 'services/helper';

export default function ReviewPage({ ...props }) {
  const {
    title,
    subTitle,
    body,
    transactionRows,
    currSubFormData,
    resetStore
  } = props;
  const totalTransactionCount = transactionRows.length;
  const totalPaymentAmount = transactionRows.reduce(
    (acc, curr) => acc + curr.remittanceAmount,
    0
  );

  const summaryColumns = [
    {
      id: 'processingMode',
      label: 'Processing Mode',
      minWidth: 200
    },
    {
      id: 'transactionCount',
      label: 'Transaction Count',
      minWidth: 200
    },
    {
      id: 'paymentCurrency',
      label: 'Payment Currency',
      minWidth: 200
    },
    {
      id: 'totalPaymentAmount',
      label: 'Total Payment Amount',
      minWidth: 200,
      format: (value) => formatToCurrency(value)
    }
  ];

  const { processingMode, paymentCurrency } = currSubFormData;
  const summaryRow = [
    {
      processingMode,
      transactionCount: totalTransactionCount,
      paymentCurrency,
      totalPaymentAmount: totalPaymentAmount
    }
  ];

  const buttonProps = {
    label: 'Back to Create Outward Payment Request File',
    type: 'button',
    componentProps: {
      color: 'neutral',
      onClick: resetStore
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Alert severity={subTitle.severity}>{subTitle.text}</Alert>
        </Grid>
        <Grid item container direction="column" alignItems="center" spacing={2}>
          {body.map(({ label, value }, index) => (
            <Grid key={label + index} item container justifyContent="center">
              <Grid item xs={4}>
                <Typography variant="h6">{label}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">{value}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <DataTable
            title="Transaction Summary"
            columns={summaryColumns}
            rows={summaryRow}
            showPagination={false}
          />
        </Grid>
        <Grid item>
          <FormButton {...buttonProps} />
        </Grid>
      </Grid>
    </Box>
  );
}
