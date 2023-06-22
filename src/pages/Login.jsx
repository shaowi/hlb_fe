import { Lock, Person } from '@mui/icons-material';
import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  Paper,
  ThemeProvider,
  Typography,
  createTheme
} from '@mui/material';
import { useState } from 'react';
import Copyright from 'components/Copyright';
import TextField from 'components/forms_ui/TextField';
import { Form, Formik } from 'formik';
import logInUser from 'services/LoginService';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  typography: {
    h4: {
      color: '#BBB'
    }
  }
});

const INITIAL_FORM_STATE = {
  username: '',
  password: ''
};

const FORM_VALIDATION = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

export default function Login() {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
    const { username, password } = values;
    if (logInUser(username, password)) {
      navigate('/home');
      return;
    }
    setHasError(true);
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
            <img src="/images/logo.png" alt="hlb" width="60%" height="auto" />
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
                validateOnBlur={false}
                validationOnChange={false}
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
            {hasError && (
              <Grid item>
                <Alert variant="outlined" severity="error">
                  Invalid username or password.
                  <br /> Please try again.
                </Alert>
              </Grid>
            )}
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
