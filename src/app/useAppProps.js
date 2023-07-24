import {
  CREATE_PAYMENT_FILE,
  REJECTED_PAYMENT_FILE,
  UPLOAD_PAYMENT_FILE
} from 'constant';
import CreatePaymentMain from 'pages/tabs/create_payment_main';
import UploadPaymentMain from 'pages/tabs/upload_payment_main';
import RejectedPaymentMain from '../pages/tabs/rejected_payment_main';
import { useAppStore } from './app_store';

export default function useAppProps() {
  const { setUsername, setIsLoading, setIsMaker } = useAppStore();
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

  return { loginProps, paymentFileTabsProps, notFoundProps };
}
