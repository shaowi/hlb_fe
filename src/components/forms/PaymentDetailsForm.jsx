import { Autocomplete, Divider, Grid, Paper, Typography } from '@mui/material';
import { REMITTANCE_CURRENCY } from 'constants';
import TextField from '../forms_ui/TextField';

export default function PaymentDetailsForm({ formData, setFieldValue }) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, mt: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h5">Payment Details</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <Autocomplete
                required
                disablePortal
                id="remittanceCurrency"
                name="remittanceCurrency"
                defaultValue={
                  formData.remittanceCurrency.value === ''
                    ? null
                    : formData.remittanceCurrency
                }
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                getOptionLabel={(option) => option.label}
                options={REMITTANCE_CURRENCY}
                onChange={(e, value) => {
                  setFieldValue(
                    'beneficiaryCountryCode',
                    value !== null ? value : formData.beneficiaryCountryCode
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    name="remittanceCurrency"
                    label="Remittance Currency"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="remittanceAmount"
                label="Remittance Amount"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="fxContractReferenceNo"
                label="FX Contract Reference Number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField name="exchangeRate" label="Exchange Rate" />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="creditingFxRate"
                label="Crediting FX Rate"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="debitingFxRate"
                label="Debiting FX Rate"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField name="paymentCurrency" label="Payment Currency" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="paymentAmount" label="Payment Amount" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="localEquivalentAmount"
                label="Local Equivalent Amount (In SGD)"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
