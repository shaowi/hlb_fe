import { ThemeProvider, createTheme } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import PageTabs from './components/PageTabs';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { REJECTED_PAYMENT_FILE } from 'constants';
import { UPLOAD_PAYMENT_FILE } from 'constants';
import { CREATE_PAYMENT_FILE } from 'constants';
import RejectedPaymentMain from './pages/tabs/rejected_payment_main';
import CreatePaymentMain from 'pages/tabs/create_payment_main';
import UploadPaymentMain from 'pages/tabs/UploadPaymentMain';

const theme = createTheme({
  palette: {
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

function App() {
  const loginProps = {
    imageSrc: '/images/logo.png',
    imageAlt: 'hlb',
    centerText: 'Payment Gateway Biz Ops Portal',
    version: 'v0.1',
    footerText: `Copyright © ${new Date().getFullYear()} HL Bank. All Rights Reserved.`,
    formHeaderText: 'Log in',
    formFieldLabels: ['Username', 'Password']
  };

  const paymentFileTabsProps = [
    {
      title:
        'Creation of Outward ISS CBFT Credit Transfer (MT103) Payment File',
      label: REJECTED_PAYMENT_FILE,
      content: <RejectedPaymentMain />
    },
    {
      title: 'Upload of Outward ISS CBFT Credit Transfer (MT103) Payment File',
      label: UPLOAD_PAYMENT_FILE,
      content: <UploadPaymentMain />
    },
    {
      title:
        'Creation of Outward ISS CBFT Credit Transfer (MT103) Payment File',
      label: CREATE_PAYMENT_FILE,
      content: <CreatePaymentMain />
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login {...loginProps} />} />
          <Route path="/login" element={<Login {...loginProps} />} />
          <Route
            path="/home"
            element={
              <Home>
                <Footer isFixed={true} />
              </Home>
            }
          />
          <Route
            path="/outward-iss-cbft-credit-transfer"
            element={
              <Home>
                <PageTabs tabsContent={paymentFileTabsProps} />
              </Home>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
