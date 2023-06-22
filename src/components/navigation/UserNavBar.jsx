import { Link, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

export default function UserNavBar() {
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
          <img src="/images/logo.png" alt="hlb" width="20%" height="auto" />
          <Link href="/home" underline="none">
            <Typography variant="h5" align="center">
              Payment Gateway Biz Ops Portal
            </Typography>
          </Link>
        </Stack>

        <Stack direction="row" spacing={4}>
          <Link href="#" underline="none">
            <Typography variant="subtitle1" align="center">
              phbmaker
            </Typography>
          </Link>
          <Link href="/login" underline="none">
            <Typography variant="subtitle1" align="center">
              Logout
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
}
