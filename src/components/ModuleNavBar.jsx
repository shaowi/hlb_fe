import { Button, Grid, Menu, MenuItem, Paper } from '@mui/material';
import React from 'react';

export default function ModuleNavBar() {
  const MODULE_TITLES = ['Dashboard', 'Transaction', 'Merchant', 'User'];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      style={{ backgroundColor: '#22A9E8' }}
      square
      elevation={2}
      sx={{
        p: 2,
        pl: 4,
        pr: 4,
        ml: 2,
        mr: 2,
        flexGrow: 1
      }}
    >
      <Grid container spacing={2}>
        {MODULE_TITLES.map((title) => (
          <Grid item key={title}>
            <Button
              color="white"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Dashboard
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
