import { useAppStore } from 'app_store';
import AlertDialog from 'components/AlertDialog';
import { useEffect, useState } from 'react';
import { parseCsvFileData } from 'services/PaymentFileService';
import { mapNullValuesToEmptyString } from 'services/helper';
import PaymentFile from '../shared/PaymentFile';
import UploadButton from './UploadButton';
import { useUploadPaymentStore } from './upload_payment_store';

export default function UploadPaymentMain() {
  const { setFixedFooterIfPageHasScrollbar } = useAppStore();
  const store = useUploadPaymentStore();
  const {
    setCurrMainFormData,
    setSubFormDataList,
    setApplicantDetails,
    setTransactionSummaryData,
    transactionRows,
    transactionColumns
  } = store;
  const [hasError, setHasError] = useState(false);
  const [showPaymentFile, setShowPaymentFile] = useState(false);
  const [isSingleDebit, setIsSingleDebit] = useState(false);
  const [transactionsPassValidation, setTransactionsPassValidation] = useState(
    []
  );

  useEffect(() => {
    setFixedFooterIfPageHasScrollbar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPaymentFile]);

  function onUpload(data, fileInfo) {
    setShowPaymentFile(true);
    if (data.length <= 1) {
      setHasError(true);
      return;
    }
    setIsSingleDebit(data[0].debitType === 'S');
    data = data.map(mapNullValuesToEmptyString);
    const [
      currMainFormData,
      applicantDetails,
      subFormDataList,
      transactionSummaryData
    ] = parseCsvFileData(data, fileInfo.name, isSingleDebit);

    validateTransactions(data);
    setCurrMainFormData(currMainFormData);
    setSubFormDataList(subFormDataList);
    setTransactionSummaryData(transactionSummaryData);
    isSingleDebit && setApplicantDetails(applicantDetails[0]);
  }

  function validateTransactions(data) {
    // TODO: validate rates based on remittance currency
    // set to all passed for now
    setTransactionsPassValidation(data.map((d) => true));
  }

  function closeAlert() {
    setHasError(false);
  }

  const alertDialogProps = {
    title: 'Error in reading file',
    content:
      'Please ensure csv file has the correct data format and try again.',
    buttons: [
      {
        type: 'button',
        label: 'Ok',
        componentProps: {
          color: 'error',
          onClick: closeAlert
        }
      }
    ],
    open: hasError,
    handleClose: closeAlert
  };

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
    setShowPaymentFile,
    isSingleDebit,
    setIsSingleDebit,
    transactionsPassValidation
  };

  return (
    <>
      {hasError && <AlertDialog {...alertDialogProps} />}
      {showPaymentFile ? (
        <PaymentFile {...paymentFileProps} />
      ) : (
        <UploadButton handleForce={onUpload} />
      )}
    </>
  );
}
