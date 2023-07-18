import { ThemeProvider } from '@mui/material';
import ContentWrapper from 'components/ContentWrapper';
import {
  CREATE_PAYMENT_FILE,
  MAKER,
  REJECTED_PAYMENT_FILE,
  UPLOAD_PAYMENT_FILE
} from 'constants';
import UploadPaymentMain from 'pages/tabs/UploadPaymentMain';
import CreatePaymentMain from 'pages/tabs/create_payment_main';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { getCurrentUser } from 'services/UserService';
import { theme } from 'theme';
import { useAppStore } from './app_store';
import Footer from './components/Footer';
import PageTabs from './components/PageTabs';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RejectedPaymentMain from './pages/tabs/rejected_payment_main';

export default function App() {
  const { isMaker, setUsername, setIsLoading, setIsMaker } = useAppStore();

  useEffect(() => {
    /**
     * The function fetches the current user and sets the username if the user exists.
     */
    async function fetchAndSetUser() {
      const user = await getCurrentUser();
      setUsername(user?.name);
      setIsMaker(user?.role === MAKER);
      setIsLoading(false);
    }
    fetchAndSetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginProps = {
    imageSrc: '/images/logo.png',
    imageAlt: 'hlb',
    centerText: 'Payment Gateway Biz Ops Portal',
    version: 'v0.1',
    footerText: `Copyright © ${new Date().getFullYear()} HL Bank. All Rights Reserved.`,
    formHeaderText: 'Log in',
    formFieldLabels: ['Username', 'Password'],
    setUsername,
    setIsFetchingUser: setIsLoading,
    setIsMaker
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
                {isMaker ? (
                  <PageTabs tabsContent={paymentFileTabsProps} />
                ) : (
                  <ContentWrapper title="Review of Outward ISS CBFT Credit Transfer (MT103) Payment File Request">
                    <RejectedPaymentMain />
                  </ContentWrapper>
                )}
              </Home>
            }
          />
          <Route path="*" element={<NotFound {...notFoundProps} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
