import { Lock, Person } from '@mui/icons-material';
import {
  Alert,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography
} from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInUser } from 'services/UserService';
import { theme } from 'theme';
import { cloneDeep } from 'lodash';

const themeCopy = cloneDeep(theme);
themeCopy.typography.h4.color = '#BBB';

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
  const navigate = useNavigate();

  const [topFieldLabel, bottomFieldLabel] = formFieldLabels;
  const [topFieldName, bottomFieldName] = formFieldNames;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
                  required: true,
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
                  required: true,
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
        type: 'loading',
        isLoading: isSubmitting,
        label: 'Log in',
        componentProps: {
          fullWidth: true
        }
      }
    ]
  };

  async function handleSubmit(values) {
    setIsSubmitting(true);
    setHasError(false);

    const { [topFieldName]: username, [bottomFieldName]: password } = values;
    const responseCode = await logInUser(username, password);
    const isSuccess = responseCode === 200;
    const hasNetworkError = responseCode === 0;
    if (isSuccess) {
      navigate('/home');
      return;
    }
    if (hasNetworkError) {
      setErrorMessage('Network error occurred in the server.');
    } else {
      setErrorMessage(`Invalid ${topFieldName} or ${bottomFieldName}.`);
    }

    setIsSubmitting(false);
    setHasError(true);
  }

  return (
    <ThemeProvider theme={themeCopy}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              p: 6
            }}
          >
            <Grid container spacing={6}>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                md={6}
              >
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
                      {errorMessage}
                      <br /> Please try again.
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Typography
              sx={{ mt: 5 }}
              variant="body2"
              color="text.secondary"
              align="center"
            >
              {footerText}
            </Typography>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}
