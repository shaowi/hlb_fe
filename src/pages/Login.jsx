import { Lock, Person } from '@mui/icons-material';
import {
  InputAdornment,
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Copyright from '../components/Copyright';
import TextField from '../components/forms_ui/TextField';
import logInUser from './../services/LoginService';

const theme = createTheme({
  typography: {
    h4: {
      fontSize: '1.5rem',
      color: '#BBB'
    },
    subtitle2: {
      color: 'red'
    }
  }
});

const INITIAL_FORM_STATE = {
  username: '',
  password: ''
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

export default function Login() {
  const handleSubmit = (values) => {
    console.log(values);
    const { username, password } = values;
    logInUser(username, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={16}
        sx={{
          p: 4,
          flexGrow: 1,
          marginTop: 12,
          marginBottom: 12,
          marginLeft: 20,
          marginRight: 20,
          padding: 10,
          paddingBottom: '1rem'
        }}
      >
        <Grid container spacing={6}>
          <Grid item container direction="column" alignItems="center" md={6}>
            <img src="/images/logo.png" alt="Login" width="60%" height="auto" />
            <Typography variant="h4" align="center" gutterBottom>
              Payment Gateway Biz Ops Portal
            </Typography>
            <Typography variant="subtitle2">v0.1</Typography>
          </Grid>
          <Grid item container direction="column" md={6} spacing={2}>
            <Grid item>
              <Typography variant="h4">Login</Typography>
            </Grid>
            <Grid item>
              <Formik
                initialValues={INITIAL_FORM_STATE}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        name="username"
                        label="Username"
                        data-testid="username"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        label="Password"
                        type="password"
                        data-testid="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth type="submit" variant="contained">
                        Log in
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Grid>
        <Copyright
          sx={{ mt: 5 }}
          content="Copyright © 2022 HL Bank. All Rights Reserved."
        />
      </Paper>
    </ThemeProvider>
  );
}
