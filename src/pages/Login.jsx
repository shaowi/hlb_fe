import { Lock, Person } from '@mui/icons-material';
import {
  Alert,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme
} from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInUser } from 'services/UserService';

const theme = createTheme({
  typography: {
    h4: {
      color: '#BBB',
      fontSize: '1.5rem'
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
  const navigate = useNavigate();

  const [topFieldLabel, bottomFieldLabel] = formFieldLabels;
  const [topFieldName, bottomFieldName] = formFieldNames;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formAttributes = useMemo(() => {
    return {
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
          type: 'loading',
          isLoading: isSubmitting,
          label: 'Log in',
          componentProps: {
            fullWidth: true
          }
        }
      ]
    };
  }, [
    topFieldLabel,
    bottomFieldLabel,
    topFieldName,
    bottomFieldName,
    formHeaderText,
    isSubmitting
  ]);

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
      setErrorMessage('Network error in the server.');
    } else {
      setErrorMessage(`Invalid ${topFieldName} or ${bottomFieldName}.`);
    }

    setIsSubmitting(false);
    setHasError(true);
  }

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
          ml: 22,
          mr: 22
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
    </ThemeProvider>
  );
}
