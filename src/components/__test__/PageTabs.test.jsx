import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
  CREATE_PAYMENT_FILE,
  REJECTED_PAYMENT_FILE,
  UPLOAD_PAYMENT_FILE
} from 'constant';
import UploadPaymentMain from 'pages/tabs/UploadPaymentMain';
import CreatePaymentMain from 'pages/tabs/create_payment_main';
import RejectedPaymentMain from 'pages/tabs/rejected_payment_main';
import PageTabs from './../PageTabs';

describe('PageTabs', () => {
  const props = [
    {
      title:
        'Rejection of Outward ISS CBFT Credit Transfer (MT103) Payment File',
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

  it('should render the label passed by props', () => {
    render(<PageTabs tabsContent={props} />);
    const tab1Element = screen.getByText(/rejected payment file/i);
    const tab2Element = screen.getByText(/upload payment file/i);
    const tab3Element = screen.getByText(/create payment file/i);
    expect(tab1Element).toBeInTheDocument();
    expect(tab2Element).toBeInTheDocument();
    expect(tab3Element).toBeInTheDocument();
  });
});
