import { Divider, Grid, Paper, Typography } from '@mui/material';
import { TRANSACTION_PURPOSE_CODE } from 'constants.js';
import SelectField from '../forms_ui/Select';
import TextField from '../forms_ui/TextField';

export default function TransactionDetailsForm() {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, mt: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h5">Transaction Details</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="channelTransactionReference"
              label="Channel Transaction Reference"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField name="recipientReference" label="Recipient Reference" />
          </Grid>
          <Grid item xs={4}>
            <SelectField
              name="purposeCode"
              label="Purpose Code"
              options={TRANSACTION_PURPOSE_CODE}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <TextField name="remittanceInfo" label="Remittance Info" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="additionalRemittanceInfo"
              label="Additional Remittance Info"
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="senderToReceiverInfo"
              label="Sender to Receiver Information"
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="additionalSenderToReceiverInfo"
              label="Additional Sender to Receiver Information"
              multiline={true}
              rows={3}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="otherPaymentDetails"
              label="Other Payment Details"
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="additionalRemarks"
              label="Additional Remarks"
              multiline={true}
              rows={3}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
