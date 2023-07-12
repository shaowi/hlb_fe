import PaymentFile from './../shared/PaymentFile';
import { useCreatePaymentStore } from './create_payment_store';

export default function CreatePaymentMain() {
  const store = useCreatePaymentStore();
  return <PaymentFile storeProps={store} isCreate={true} />;
}
