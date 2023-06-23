import { Autocomplete, Divider, Paper, Grid, Typography } from '@mui/material';
import React from 'react';
import TextField from '../forms_ui/TextField';
import SelectField from '../forms_ui/Select';
import { COUNTRY_CODE, RESIDENT_CODE } from 'constants';
import { ACCOUNT_BIC } from 'constants';

export default function BeneficiaryForm({
  isDisabled = false,
  formData,
  setFieldValue
}) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, mt: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h5">Beneficiary Details</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="beneficiaryName"
                label="Name"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="beneficiaryAccountNo"
                label="Account Number"
                disabled={isDisabled}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="beneficiaryIdType"
                label="ID Type"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="beneficiaryId"
                label="ID"
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectField
                name="beneficiaryResidentCode"
                label="Resident Code"
                options={RESIDENT_CODE}
                disabled={isDisabled}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <Autocomplete
                required
                disablePortal
                id="beneficiaryAccountBic"
                name="beneficiaryAccountBic"
                defaultValue={
                  formData.beneficiaryAccountBic.value === ''
                    ? null
                    : formData.beneficiaryAccountBic
                }
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                getOptionLabel={(option) => option.label}
                options={ACCOUNT_BIC}
                onChange={(e, value) => {
                  setFieldValue(
                    'beneficiaryAccountBic',
                    value !== null ? value : formData.beneficiaryAccountBic
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Account BIC"
                    name="beneficiaryAccountBic"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="beneficiaryBankName"
                label="Bank Name"
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="beneficiaryBankCountryCode"
                label="Bank Country Code"
                disabled
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="beneficiaryBankAddress1"
                label="Bank Address 1"
                multiline={true}
                rows={3}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="beneficiaryBankAddress2"
                label="Bank Address 2"
                multiline={true}
                rows={3}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="beneficiaryBankAddress3"
                label="Bank Address 3"
                multiline={true}
                rows={3}
                disabled={isDisabled}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                name="beneficiaryAddress1"
                label="Address 1"
                multiline={true}
                rows={3}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="beneficiaryAddress2"
                label="Address 2"
                multiline={true}
                rows={3}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="beneficiaryAddress3"
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
                id="beneficiaryCountryCode"
                name="beneficiaryCountryCode"
                defaultValue={
                  formData.beneficiaryCountryCode.value === ''
                    ? null
                    : formData.beneficiaryCountryCode
                }
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                getOptionLabel={(option) => option.label}
                options={COUNTRY_CODE}
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
                    label="Country Code"
                    name="beneficiaryCountryCode"
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
