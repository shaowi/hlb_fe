import { Grid } from '@mui/material';
import TextField from '../forms_ui/TextField';
import SelectField from '../forms_ui/Select';
import { DEBIT_TYPE } from 'constants.js';

export default function FileSubForm() {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <SelectField
            required
            disabled
            name="debitType"
            label="Debit Type"
            options={DEBIT_TYPE}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField disabled name="transactionType" label="Transaction Type" />
        </Grid>
        <Grid item xs={4}>
          <TextField disabled name="processingMode" label="Processing Mode" />
        </Grid>
      </Grid>
    </Grid>
  );
}
