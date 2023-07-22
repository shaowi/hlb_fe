import { useState } from 'react';
import PaymentFile from '../shared/PaymentFile';
import { useCreatePaymentStore } from './create_payment_store';

/**
 * The function exports a React component called CreatePaymentMain that renders a PaymentFile component with props from a
 * store.
 * @returns the component `<PaymentFile />` with the props `paymentFileProps`.
 */
export default function CreatePaymentMain() {
  const store = useCreatePaymentStore();
  const { transactionRows, transactionColumns } = store;
  const [isSingleDebit, setIsSingleDebit] = useState(
    store.currMainFormData.debitType === 'single'
  );
  const dataTableProps = {
    title: 'Transaction Details',
    rows: transactionRows,
    columns: transactionColumns,
    emptyTableMessage: 'No transactions added'
  };
  const paymentFileProps = {
    storeProps: store,
    dataTableProps,
    isCreate: true,
    isSingleDebit,
    setIsSingleDebit
  };

  return <PaymentFile {...paymentFileProps} />;
}
