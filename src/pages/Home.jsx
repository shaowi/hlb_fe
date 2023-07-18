import ModuleNavBar from 'components/navigation/ModuleNavBar';
import UserNavBar from 'components/navigation/UserNavBar';
import Loader from 'pages/Loader';
import NotFound from './NotFound';
import { useAppStore } from 'app_store';

export default function Home({ children }) {
  const { isMaker, username, isLoading } = useAppStore();
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
    </>
  ) : (
    <NotFound {...restrictedProps} />
  );
}
