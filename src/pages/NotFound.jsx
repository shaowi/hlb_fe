import { Container, Grid, Paper, Typography } from '@mui/material';
import FormButton from 'components/forms_ui/buttons/FormButton';
import { Link } from 'react-router-dom';

/* A React functional component called `NotFound`. It is exported as the default export, which means
it can be imported and used in other files without specifying its name. */
export default function NotFound(props) {
  const { code, centerText, subText, buttonText, buttonLink } = props;
  const buttonProps = {
    componentProps: {
      component: Link,
      to: buttonLink,
      color: 'primary'
    },
    label: buttonText
  };
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
                {code}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{centerText}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{subText}</Typography>
            </Grid>
            <Grid item>
              <FormButton {...buttonProps} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
