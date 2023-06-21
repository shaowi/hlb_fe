import { Grid } from '@mui/material';
import React from 'react';
import { DEBIT_TYPE, FILENAME_FORMAT } from '../../constants';
import DateTimePicker from '../forms_ui/DateTimePicker';
import SelectField from '../forms_ui/Select';
import TextField from '../forms_ui/TextField';
import ToolTipWrapper from '../forms_ui/ToolTipWrapper';

export default function FileForm() {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <ToolTipWrapper title={FILENAME_FORMAT} placement="top">
            <TextField name="filename" label="Filename" />
          </ToolTipWrapper>
        </Grid>
        <Grid item xs={4}>
          <SelectField
            required
            name="debitType"
            label="Debit Type"
            options={DEBIT_TYPE}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <TextField
            name="channelTransactionReference"
            label="Channel Transaction Reference"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField name="transactionType" label="Transaction Type" />
        </Grid>
        <Grid item xs={4}>
          <TextField name="requestChannel" label="Request Channel" />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <DateTimePicker name="transactionDate" label="Transaction Date" />
        </Grid>
        <Grid item xs={4}>
          <DateTimePicker required name="valueDate" label="Value Date" />
        </Grid>
        <Grid item xs={4}>
          <DateTimePicker name="businessDate" label="Business Date" />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <TextField name="recipientReference" label="Recipient Reference" />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="otherPaymentDetails"
            label="Other Payment Details"
            multiline={true}
            rows={3}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
