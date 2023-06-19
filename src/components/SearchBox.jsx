import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import TextField from '../components/forms_ui/TextField';
import DateTimePicker from './forms_ui/DateTimePicker';
import SelectField from './forms_ui/Select';

const currentDate = new Date().toJSON().slice(0, 10);
const previousMonthDate = new Date(
  new Date().setMonth(new Date().getMonth() - 1)
)
  .toJSON()
  .slice(0, 10);

const STATUSES = {
  all: 'ALL',
  rejected: 'REJECTED',
  failed: 'FAILED',
  declined: 'DECLINED',
  pending: 'PENDING REVIEW'
};

const INITIAL_FORM_STATE = {
  filename: '',
  status: '',
  businessDateFrom: previousMonthDate,
  businessDateTo: currentDate,
  transactionDateFrom: '',
  transactionDateTo: ''
};

const FORM_VALIDATION = Yup.object().shape({
  filename: Yup.string(),
  status: Yup.string().required('Status is required'),
  businessDateFrom: Yup.date().required('Business Date From is required'),
  businessDateTo: Yup.date().required('Business Date To is required'),
  transactionDateFrom: Yup.date(),
  transactionDateTo: Yup.date()
});

export default function SearchBox() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box sx={{ p: 3, mb: 5 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h4">Search Criteria</Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="filename"
                      label="Filename"
                      data-testid="filename"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectField
                      required
                      name="status"
                      label="Status"
                      data-testid="status"
                      options={STATUSES}
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <DateTimePicker
                      required
                      name="businessDateFrom"
                      label="Business Date(From)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      required
                      name="businessDateTo"
                      label="Business Date(To)"
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <DateTimePicker
                      name="transactionDateFrom"
                      label="Transaction Date(From)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      name="transactionDateTo"
                      label="Transaction Date(To)"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
}
