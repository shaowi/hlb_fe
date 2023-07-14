import PaymentFile from '../shared/PaymentFile';
import { useCreatePaymentStore } from './create_payment_store';

/**
 * The function exports a React component called CreatePaymentMain that renders a PaymentFile component with props from a
 * store.
 * @returns the component `<PaymentFile />` with the props `paymentFileProps`.
 */
export default function CreatePaymentMain() {
  const store = useCreatePaymentStore();
  const paymentFileProps = {
    storeProps: store,
    isCreate: true
  };
  return <PaymentFile {...paymentFileProps} />;
}
