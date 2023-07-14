import { Container, Grid, Paper, Typography } from '@mui/material';
import FormButton from 'components/forms_ui/buttons/FormButton';
import { Link } from 'react-router-dom';

/* A React functional component called `NotFound`. It is exported as the default export, which means
it can be imported and used in other files without specifying its name. */
export default function NotFound(props) {
  const { centerText, subText, buttonText, buttonLink } = props;
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container direction="column" spacing={3} alignItems="center">
            <Grid item>
              <Typography variant="h1" color="primary">
                404
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{centerText}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{subText}</Typography>
            </Grid>
            <Grid item>
              <FormButton
                component={Link}
                to={buttonLink}
                label={buttonText}
                color="primary"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
