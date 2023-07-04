import {
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme
} from '@mui/material';
import FormButton from 'components/forms_ui/buttons/FormButton';
import { Link } from 'react-router-dom';

const theme = createTheme({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: 3
  },
  button: {
    marginTop: 6
  }
});

export default function NotFound() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container direction="column" spacing={3} alignItems="center">
              <Grid item>
                <Typography variant="h1" color="primary">
                  404
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">Oops! Page not found.</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  The page you are looking for might have been removed, had its
                  name changed, or is temporarily unavailable.
                </Typography>
              </Grid>
              <Grid item>
                <FormButton
                  component={Link}
                  to="/"
                  color="primary"
                  label="Go to Home"
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}
