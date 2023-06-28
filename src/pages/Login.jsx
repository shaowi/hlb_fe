import { Lock, Person } from '@mui/icons-material';
import {
  Alert,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme
} from '@mui/material';
import Copyright from 'components/Copyright';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logInUser from 'services/LoginService';

const theme = createTheme({
  typography: {
    h4: {
      color: '#BBB'
    }
  }
});

const { TEXT } = FORM_TYPES;

export default function Login() {
  const formAttributes = {
    sections: [
      {
        title: {
          value: 'Log in',
          variant: 'h4'
        },
        rows: [
          {
            fields: [
              {
                type: TEXT,
                icon: <Person />,
                defaultValue: '',
                componentProps: {
                  name: 'username',
                  label: 'Username',
                  'data-testid': 'username',
                  autoFocus: true
                }
              }
            ]
          },
          {
            fields: [
              {
                type: TEXT,
                icon: <Lock />,
                defaultValue: '',
                componentProps: {
                  type: 'password',
                  name: 'password',
                  label: 'Password',
                  'data-testid': 'password'
                }
              }
            ]
          }
        ]
      }
    ],
    buttons: [
      {
        label: 'Log in',
        fullWidth: true
      }
    ]
  };

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
          p: 8,
          pb: '1rem',
          flexGrow: 1,
          mt: 12,
          mb: 12,
          ml: 20,
          mr: 20
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
              <FormBuilder
                onSubmit={handleSubmit}
                formAttributes={formAttributes}
              />
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
