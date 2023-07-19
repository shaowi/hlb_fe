import PaymentFile from '../shared/PaymentFile';
import { useCreatePaymentStore } from './create_payment_store';
import { useState } from 'react';

/**
 * The function exports a React component called CreatePaymentMain that renders a PaymentFile component with props from a
 * store.
 * @returns the component `<PaymentFile />` with the props `paymentFileProps`.
 */
export default function CreatePaymentMain() {
  const store = useCreatePaymentStore();
  const [isSingleDebit, setIsSingleDebit] = useState(
    store.currMainFormData.debitType === 'single'
  );
  const paymentFileProps = {
    storeProps: store,
    isCreate: true,
    isSingleDebit,
    setIsSingleDebit
  };
  return <PaymentFile {...paymentFileProps} />;
}
