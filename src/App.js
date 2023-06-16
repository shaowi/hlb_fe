import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    white: {
      main: '#fff'
    }
  },
  typography: {
    h4: {
      fontSize: '1.5rem',
      color: '#BBB'
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
