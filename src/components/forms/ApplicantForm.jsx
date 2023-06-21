import { Autocomplete, Divider, Paper, Grid, Typography } from '@mui/material';
import React from 'react';
import TextField from '../forms_ui/TextField';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

export default function ApplicantForm() {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, mt: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h4">Applicant Details</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField required name="applicantName" label="Name" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAccountNo"
                label="Account Number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAccountType"
                label="Account Type"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAccountCurrency"
                label="Account Currency"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField name="applicantIdType" label="ID Type" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="applicantId" label="ID" />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAccountBranchCode"
                label="Account Branch Code"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField name="applicantBankBic" label="Bank BIC" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="applicantResidentCode" label="Resident Code" />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField name="applicantAccountCifId" label="Account CIF ID" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="applicantPhone" label="Phone" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="applicantPostalCode" label="Postal Code" />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAddress1"
                label="Address 1"
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="applicantAddress2"
                label="Address 2"
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="applicantAddress3"
                label="Address 3"
                multiline={true}
                rows={3}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                id="applicantCountryCode"
                options={top100Films}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    name="applicantCountryCode"
                    label="Country Code"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
