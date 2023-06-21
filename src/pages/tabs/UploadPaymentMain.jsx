import React from 'react';
import { Button, Box, Tooltip, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function UploadPaymentMain() {
  const toolTipText =
    'Filename should be in the format of OPFR+yyyyMMdd+7 digits of running number per day. E.g.: OPFR202306210000001.csv';

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
          <Tooltip title={toolTipText}>
            <InfoIcon />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
