import { Link, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { logOutUser } from 'services/UserService';
import { useNavigate } from 'react-router-dom';

export default function UserNavBar({
  imageSrc,
  imageAlt,
  centerText,
  username,
  logoutText
}) {
  const navigate = useNavigate();

  function handleLogout() {
    logOutUser();
    navigate('/login');
  }

  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        flexGrow: 1,
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4,
        width: '98%',
        margin: 'auto'
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <img src={imageSrc} alt={imageAlt} width="20%" height="auto" />
          <Link href="/home" underline="none">
            <Typography variant="h5" align="center">
              {centerText}
            </Typography>
          </Link>
        </Stack>

        <Stack direction="row" spacing={4}>
          <Link href="#" underline="none">
            <Typography variant="subtitle1" align="center">
              {username}
            </Typography>
          </Link>
          <Link underline="none" component="button" onClick={handleLogout}>
            <Typography variant="subtitle1" align="center">
              {logoutText}
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
}
