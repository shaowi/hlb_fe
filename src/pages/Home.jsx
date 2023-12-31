import { useAppStore } from 'app/app_store';
import Footer from 'components/Footer';
import ModuleNavBar from 'components/navigation/ModuleNavBar';
import UserNavBar from 'components/navigation/UserNavBar';
import Loader from 'components/Loader';
import { useEffect } from 'react';
import NotFound from './NotFound';

/**
 * The Home component is a React component that renders different content based on the user's permissions and login status.
 * @returns a JSX element.
 */
export default function Home({ children }) {
  const {
    isMaker,
    username,
    isLoading,
    isFooterFixed,
    setFixedFooterIfPageHasScrollbar
  } = useAppStore();

  useEffect(() => {
    setFixedFooterIfPageHasScrollbar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userNavBarProps = {
    imageSrc: '/images/logo.png',
    imageAlt: 'hlb',
    centerText: 'Payment Gateway Biz Ops Portal',
    username,
    logoutText: 'Logout'
  };

  const moduleNavBarMenu = isMaker
    ? [
        {
          name: 'Create Transaction',
          items: [
            {
              name: 'Bulk Outward Credit Transfer',
              items: [
                {
                  name: 'Creation of Outward ISS CBFT Credit Transfer (MT103)',
                  link: '/outward-iss-cbft-credit-transfer'
                },
                {
                  name: 'Creation of Outward ISS MEPS Credit Transfer (MT103)',
                  link: '/outward-iss-meps-credit-transfer'
                },
                {
                  name: 'Creation of Outward ISS IBG Credit Transfer',
                  link: '/outward-iss-ibg-credit-transfer'
                },
                {
                  name: 'Creation of Outward ISS G3 FAST Credit Transfer',
                  link: '/outward-iss-g3-fast-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS CBFT Credit Transfer (MT103)',
                  link: '/review-outward-iss-cbft-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS IBG Credit Transfer',
                  link: '/review-outward-iss-ibg-credit-transfer'
                }
              ]
            },
            {
              name: 'Online Outward Credit Transfer',
              items: [
                {
                  name: 'Creation of Outward ISS CBFT Credit Transfer (MT103)',
                  link: '/outward-iss-cbft-credit-transfer'
                },
                {
                  name: 'Creation of Outward ISS MEPS Credit Transfer (MT103)',
                  link: '/outward-iss-meps-credit-transfer'
                },
                {
                  name: 'Creation of Outward Intra-Bank Credit Transfer',
                  link: '/outward-intra-bank-credit-transfer'
                },
                {
                  name: 'Creation of Outward ISS G3 FAST Credit Transfer',
                  link: '/outward-iss-g3-fast-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS CBFT Credit Transfer (MT103)',
                  link: '/review-outward-iss-cbft-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS MEPS Credit Transfer (MT103)',
                  link: '/review-outward-iss-meps-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS G3 FAST Credit Transfer',
                  link: '/review-outward-iss-g3-fast-credit-transfer'
                },
                {
                  name: 'Review of Outward Intra-Bank Credit Transfer',
                  link: '/review-outward-intra-bank-credit-transfer'
                }
              ]
            }
          ]
        },
        {
          name: 'Release Transaction',
          items: [
            {
              name: 'Release/Reject On-Hold Transaction Request',
              link: '/release-reject-on-hold-transaction-request'
            },
            {
              name: 'Resubmit/Reject Funding Failed Transaction Request',
              link: '/resubmit-reject-funding-failed-transaction-request'
            },
            {
              name: 'Review of Release/Reject On-Hold Transaction Request',
              link: '/review-release-reject-on-hold-transaction-request'
            },
            {
              name: 'Review of Resubmit/Reject Funding Failed Transaction Request',
              link: '/review-resubmit-reject-funding-failed-transaction-request'
            }
          ]
        }
      ]
    : [
        {
          name: 'Create Transaction',
          items: [
            {
              name: 'Bulk Outward Credit Transfer',
              items: [
                {
                  name: 'Review of Outward ISS CBFT Credit Transfer (MT103)',
                  link: '/outward-iss-cbft-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS MEPS Credit Transfer (MT103)',
                  link: '/outward-iss-meps-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS IBG Credit Transfer',
                  link: '/outward-iss-ibg-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS G3 FAST Credit Transfer',
                  link: '/outward-iss-g3-fast-credit-transfer'
                }
              ]
            },
            {
              name: 'Online Outward Credit Transfer',
              items: [
                {
                  name: 'Review of Outward ISS CBFT Credit Transfer (MT103)',
                  link: '/outward-iss-cbft-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS MEPS Credit Transfer (MT103)',
                  link: '/outward-iss-meps-credit-transfer'
                },
                {
                  name: 'Review of Outward Intra-Bank Credit Transfer',
                  link: '/outward-intra-bank-credit-transfer'
                },
                {
                  name: 'Review of Outward ISS G3 FAST Credit Transfer',
                  link: '/outward-iss-g3-fast-credit-transfer'
                }
              ]
            }
          ]
        },
        {
          name: 'Release Transaction',
          items: [
            {
              name: 'Release/Reject On-Hold Transaction Request',
              link: '/release-reject-on-hold-transaction-request'
            },
            {
              name: 'Resubmit/Reject Funding Failed Transaction Request',
              link: '/resubmit-reject-funding-failed-transaction-request'
            },
            {
              name: 'Review of Release/Reject On-Hold Transaction Request',
              link: '/review-release-reject-on-hold-transaction-request'
            },
            {
              name: 'Review of Resubmit/Reject Funding Failed Transaction Request',
              link: '/review-resubmit-reject-funding-failed-transaction-request'
            }
          ]
        }
      ];

  const restrictedProps = {
    code: 403,
    centerText: 'Oops! Restricted access.',
    subText:
      'You do not have permission to access this page. Please login and try again.',
    buttonText: 'Go to Login',
    buttonLink: '/login'
  };

  return isLoading ? (
    <Loader />
  ) : username ? (
    <>
      <UserNavBar {...userNavBarProps} />
      <ModuleNavBar menu={moduleNavBarMenu} />
      {children}
      <Footer isFixed={isFooterFixed} />
    </>
  ) : (
    <NotFound {...restrictedProps} />
  );
}
