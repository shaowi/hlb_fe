import { ThemeProvider } from '@mui/material';
import {
  CREATE_PAYMENT_FILE,
  REJECTED_PAYMENT_FILE,
  UPLOAD_PAYMENT_FILE
} from 'constants';
import UploadPaymentMain from 'pages/tabs/UploadPaymentMain';
import CreatePaymentMain from 'pages/tabs/create_payment_main';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { theme } from 'theme';
import Footer from './components/Footer';
import PageTabs from './components/PageTabs';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RejectedPaymentMain from './pages/tabs/rejected_payment_main';
import { useState, useEffect } from 'react';
import { getCurrentUser } from 'services/UserService';

export default function App() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * The function fetches the current user and sets the username if the user exists.
     */
    async function fetchAndSetUser() {
      const user = await getCurrentUser();
      setUsername(user?.name);
    }
    fetchAndSetUser().then(() => setIsLoading(false));
  }, []);

  const loginProps = {
    imageSrc: '/images/logo.png',
    imageAlt: 'hlb',
    centerText: 'Payment Gateway Biz Ops Portal',
    version: 'v0.1',
    footerText: `Copyright © ${new Date().getFullYear()} HL Bank. All Rights Reserved.`,
    formHeaderText: 'Log in',
    formFieldLabels: ['Username', 'Password'],
    setUsername
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

  const notFoundProps = {
    code: 404,
    centerText: 'Oops! Page not found.',
    subText:
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    buttonText: 'Go to Home',
    buttonLink: '/home'
  };

  const restrictedProps = {
    code: 403,
    centerText: 'Oops! Restricted access.',
    subText:
      'You do not have permission to access this page. Please login and try again.',
    buttonText: 'Go to Login',
    buttonLink: '/login'
  };

  const homeProps = {
    username,
    isLoading
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login {...loginProps} />} />
          <Route path="/login" element={<Login {...loginProps} />} />
          <Route
            path="/home"
            element={
              username ? (
                <Home {...homeProps}>
                  <Footer isFixed={true} />
                </Home>
              ) : (
                <NotFound {...restrictedProps} />
              )
            }
          />
          <Route
            path="/outward-iss-cbft-credit-transfer"
            element={
              username ? (
                <Home {...homeProps}>
                  <PageTabs tabsContent={paymentFileTabsProps} />
                </Home>
              ) : (
                <NotFound {...restrictedProps} />
              )
            }
          />
          <Route path="*" element={<NotFound {...notFoundProps} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
