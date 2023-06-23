import { Divider, Grid, Paper, Typography } from '@mui/material';
import { CHARGE_BEARER } from 'constants';
import SelectField from '../forms_ui/Select';
import TextField from '../forms_ui/TextField';
import { convertToLocalCurrency } from 'services/helper';

const ChargeDetailLabel = ({ label }) => (
  <Typography variant="subtitle1">{label}</Typography>
);

export default function ChargeDetailsForm({ formData, paymentCurrency }) {
  const debitFeeLabel = `Debit Fee in ${paymentCurrency}`;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, mt: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h5">Charges Details</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                disabled
                name="creditMidRate"
                label="Credit Mid Rate"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField disabled name="debitMidRate" label="Debit Mid Rate" />
            </Grid>
            <Grid item xs={4}>
              <SelectField
                required
                name="chargeBearer"
                label="Charge Bearer"
                options={CHARGE_BEARER}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <ChargeDetailLabel label="Commission in Lieu of Exchange" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="commissionInLieuOfExchange"
                label={debitFeeLabel}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="commissionInLieuOfExchangeStandard"
                label="Standard Fee in SGD"
                value={convertToLocalCurrency(
                  formData.commissionInLieuOfExchange
                )}
              />
            </Grid>
          </Grid>
          {/* <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <ChargeDetailLabel label="Commission Handling" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="commissionHandlingDebit" label={debitFeeLabel} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="commissionHandlingStandard"
                label="Standard Fee in SGD"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="subtitle1">Cable Charge</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField name="commissionHandlingDebit" label={debitFeeLabel} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="commissionHandlingStandard"
                label="Standard Fee in SGD"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <ChargeDetailLabel label="Cable Charge" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="cableChargeDebit" label={debitFeeLabel} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="cableChargeStandard"
                label="Standard Fee in SGD"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <ChargeDetailLabel label="Agent Fee" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="agentFeeDebit" label={debitFeeLabel} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="agentFeeStandard"
                label="Standard Fee in SGD"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <ChargeDetailLabel label="Total Fee" />
            </Grid>
            <Grid item xs={4}>
              <TextField disabled name="totalFeeDebit" label={debitFeeLabel} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="totalFeeStandard"
                label="Standard Fee in SGD"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <ChargeDetailLabel label="Net Payment Amount/Local Equivalent Amount" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="netPaymentAmountDebit"
                label={debitFeeLabel}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="netPaymentAmountStandard"
                label="Standard Fee in SGD"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <ChargeDetailLabel label="Net Remittance Amount" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="netRemittanceAmountDebit"
                label={debitFeeLabel}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                name="netRemittanceAmountStandard"
                label="Standard Fee in SGD"
              />
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
}
