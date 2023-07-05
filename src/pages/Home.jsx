import React, { useState, useEffect } from 'react';
import UserNavBar from 'components/navigation/UserNavBar';
import ModuleNavBar from 'components/navigation/ModuleNavBar';
import { getCurrentUser } from 'services/UserService';
import Loader from 'pages/Loader';

export default function Home({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const userNavBarProps = {
    imageSrc: '/images/logo.png',
    imageAlt: 'hlb',
    centerText: 'Payment Gateway Biz Ops Portal',
    username: username,
    logoutText: 'Logout'
  };

  const moduleNavBarMenu = [
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
  ];

  useEffect(() => {
    async function fetchAndSetUser() {
      const user = await getCurrentUser();
      setUsername(user?.name);
    }
    fetchAndSetUser().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <UserNavBar {...userNavBarProps} />
      <ModuleNavBar menu={moduleNavBarMenu} />
      {children}
    </>
  );
}
