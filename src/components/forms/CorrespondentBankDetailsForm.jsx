import { Divider, Grid, Paper, Typography } from '@mui/material';
import { RECEIVER_CORRESPONDENT } from 'constants';
import SelectField from '../forms_ui/Select';
import TextField from '../forms_ui/TextField';

export default function CorrespondentBankDetailsForm() {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, mt: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h5">Correspondent Bank Details</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <TextField
              required
              disabled
              name="sendersCorrespondent"
              label="Sender's Correspondent"
            />
          </Grid>
          <Grid item xs={4}>
            <SelectField
              required
              name="receiversCorrespondent"
              label="Receiver's Correspondent"
              options={RECEIVER_CORRESPONDENT}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
