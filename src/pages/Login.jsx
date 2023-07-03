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

export default function Login({
  imageSrc,
  imageAlt,
  centerText,
  version,
  footerText,
  formHeaderText,
  formFieldLabels
}) {
  // map labels to camelCase
  const formFieldNames = formFieldLabels.map((label) =>
    label
      .toLowerCase()
      .split(' ')
      .map((s, i) => (i !== 0 ? s.charAt(0).toUpperCase() + s.substring(1) : s))
      .join('')
  );

  const [topFieldLabel, bottomFieldLabel] = formFieldLabels;
  const [topFieldName, bottomFieldName] = formFieldNames;

  const formAttributes = {
    sections: [
      {
        title: {
          value: formHeaderText,
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
                  label: topFieldLabel,
                  name: topFieldName,
                  autoFocus: true,
                  'data-testid': topFieldName
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
                  label: bottomFieldLabel,
                  name: bottomFieldName,
                  'data-testid': bottomFieldName
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
          mt: 15,
          mb: 15,
          ml: 25,
          mr: 25
        }}
      >
        <Grid container spacing={6}>
          <Grid item container direction="column" alignItems="center" md={6}>
            <img src={imageSrc} alt={imageAlt} width="60%" height="auto" />
            <Typography variant="h4" align="center" gutterBottom>
              {centerText}
            </Typography>
            <Typography variant="subtitle2">{version}</Typography>
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
                  Invalid {topFieldName} or {bottomFieldName}.
                  <br /> Please try again.
                </Alert>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} content={footerText} />
      </Paper>
    </ThemeProvider>
  );
}
