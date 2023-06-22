import { Box, Grid, Typography } from '@mui/material';
import FormButton from 'components/forms/FormButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '../forms_ui/DateTimePicker';
import SelectField from '../forms_ui/Select';
import TextField from '../forms_ui/TextField';
import ResetButton from './ResetButton';

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
  const handleSearch = (values) => {
    console.log(values);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item alignItems="center" md={6}>
          <Typography variant="h4">Search Criteria</Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={handleSearch}
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
                <Grid
                  item
                  container
                  xs={12}
                  spacing={2}
                  justifyContent="center"
                >
                  <Grid item>
                    <FormButton label="Search" color="success" />
                  </Grid>
                  <Grid item>
                    <ResetButton />
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
}
