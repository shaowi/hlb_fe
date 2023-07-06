import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff'
    },
    white: {
      main: '#fff'
    }
  },
  typography: {
    h4: {
      fontSize: '1.5rem'
    },
    h5: {
      fontSize: '1.2rem',
      color: '#888'
    },
    subtitle1: {
      color: '#888'
    },
    subtitle2: {
      color: 'red'
    }
  }
});
