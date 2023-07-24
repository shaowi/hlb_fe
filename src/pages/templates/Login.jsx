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
import { cloneDeep } from 'lodash';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInUser } from 'services/UserService';
import {
  INITIAL_STATE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  loginReducer
} from 'services/reducers/loginReducer';
import { theme } from 'theme';
import { MAKER } from 'constant';

const themeCopy = cloneDeep(theme);
themeCopy.typography.h4.color = '#BBB';

const { TEXT } = FORM_TYPES;

/**
 * The Login function is a React component that renders a login form with customizable fields and handles form submission and error handling.
 * @returns The Login component is returning a JSX element that represents the login page.
 */
export default function Login(props) {
  const {
    imageSrc,
    imageAlt,
    centerText,
    version,
    footerText,
    formHeaderText,
    formFieldLabels,
    setUsername,
    setIsFetchingUser,
    setIsMaker
  } = props;
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
  const [{ isSubmitting, hasError, errorMessage }, dispatch] = useReducer(
    loginReducer,
    INITIAL_STATE
  );

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
                  autoFocus: true,
                  required: true,
                  disablePerformance: true,
                  label: topFieldLabel,
                  name: topFieldName,
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
                  disablePerformance: true,
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

  /**
   * The function handles form submission, logs in the user, and handles different response codes and errors.
   * @returns If the login is successful and the response code is 200, the function will navigate to the '/home' page and
   * return nothing. If there is a network error and the response code is 0, the function will set the appropriate error messages and shows the error.
   */
  async function handleSubmit(values) {
    dispatch({ type: LOGIN_REQUEST });

    const { [topFieldName]: username, [bottomFieldName]: password } = values;
    const { status, data } = await logInUser(username, password);
    const isSuccess = status === 200;
    const hasNetworkError = status === 0;
    setIsFetchingUser(false);
    if (isSuccess) {
      dispatch({ type: LOGIN_SUCCESS });
      setUsername(username);
      setIsMaker(data?.role === MAKER);
      navigate('/home');
      return;
    }
    const errorMessage = hasNetworkError
      ? 'Network error occurred in the server.'
      : `Invalid ${topFieldName} or ${bottomFieldName}.`;
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
  }

  const formBuilderProps = {
    onSubmit: handleSubmit,
    formAttributes
  };

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
                  <FormBuilder {...formBuilderProps} />
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
