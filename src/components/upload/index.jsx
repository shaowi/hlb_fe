import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Upload() {
  return (
    <Box sx={{ p: 3, minHeight: '45vh' }}>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden />
      </Button>
    </Box>
  );
}
