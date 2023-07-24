import { ThemeProvider } from '@mui/material';
import ContentWrapper from 'components/ContentWrapper';
import { MAKER } from 'constant';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { getCurrentUser } from 'services/UserService';
import { theme } from 'theme';
import PageTabs from '../components/PageTabs';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import RejectedPaymentMain from '../pages/tabs/rejected_payment_main';
import Login from '../pages/templates/Login';
import { useAppStore } from './app_store';
import useAppProps from './useAppProps';

export default function App() {
  const { isMaker, setUsername, setIsLoading, setIsMaker } = useAppStore();
  const { loginProps, paymentFileTabsProps, notFoundProps } = useAppProps();

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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login {...loginProps} />} />
          <Route path="/login" element={<Login {...loginProps} />} />
          <Route path="/home" element={<Home />} />
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
