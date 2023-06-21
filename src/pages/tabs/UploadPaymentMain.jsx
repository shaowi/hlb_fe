import React from 'react';
import { Button, Box, Tooltip, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { FILENAME_FORMAT } from '../../constants';

export default function UploadPaymentMain() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={2}>
          <Button variant="contained" component="label">
            Choose File
            <input type="file" hidden />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title={FILENAME_FORMAT}>
            <InfoIcon />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
