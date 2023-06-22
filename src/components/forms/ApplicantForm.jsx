import { Autocomplete, Divider, Paper, Grid, Typography } from '@mui/material';
import React from 'react';
import TextField from '../forms_ui/TextField';
import { COUNTRY_CODE, RESIDENT_CODE } from 'constants';
import SelectField from '../forms_ui/Select';

export default function ApplicantForm({
  isDisabled = false,
  formData,
  setFieldValue
}) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, mt: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h5">Applicant Details</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantName"
                label="Name"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAccountNo"
                label="Account Number"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAccountType"
                label="Account Type"
                disabled={isDisabled}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAccountCurrency"
                label="Account Currency"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="applicantIdType"
                label="ID Type"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField name="applicantId" label="ID" disabled={isDisabled} />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="applicantAccountBranchCode"
                label="Account Branch Code"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField name="applicantBankBic" label="Bank BIC" disabled />
            </Grid>
            <Grid item xs={4}>
              <SelectField
                name="applicantResidentCode"
                label="Resident Code"
                options={RESIDENT_CODE}
                disabled={isDisabled}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="applicantAccountCifId"
                label="Account CIF ID"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="applicantPhone"
                label="Phone"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="applicantPostalCode"
                label="Postal Code"
                disabled={isDisabled}
              />
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
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="applicantAddress2"
                label="Address 2"
                multiline={true}
                rows={3}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="applicantAddress3"
                label="Address 3"
                multiline={true}
                rows={3}
                disabled={isDisabled}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <Autocomplete
                disabled={isDisabled}
                required
                disablePortal
                id="applicantCountryCode"
                name="applicantCountryCode"
                defaultValue={
                  formData.applicantCountryCode.value === ''
                    ? null
                    : formData.applicantCountryCode
                }
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                getOptionLabel={(option) => option.label}
                options={COUNTRY_CODE}
                onChange={(e, value) => {
                  setFieldValue(
                    'applicantCountryCode',
                    value !== null ? value : formData.applicantCountryCode
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Country Code"
                    name="applicantCountryCode"
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
