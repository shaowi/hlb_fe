import { useState } from 'react';
import { mapNullValuesToEmptyString } from 'services/helper';
import { parseCsvFileData } from 'services/PaymentFileService';
import { useUploadPaymentStore } from './upload_payment_store';
import UploadButton from './UploadButton';
import AlertDialog from 'components/AlertDialog';
import PaymentFile from '../shared/PaymentFile';

export default function UploadPaymentMain() {
  const store = useUploadPaymentStore();
  const {
    setCurrMainFormData,
    setSubFormDataList,
    setApplicantDetails,
    setTransactionSummaryData
  } = store;
  const [hasError, setHasError] = useState(false);
  const [showPaymentFile, setShowPaymentFile] = useState(false);
  const [isSingleDebit, setIsSingleDebit] = useState(false);

  function onUpload(data, fileInfo) {
    setShowPaymentFile(true);
    if (data.length <= 1) {
      setHasError(true);
      return;
    }
    setIsSingleDebit(data[0].debitType === 'S');
    const [
      currMainFormData,
      applicantDetails,
      subFormDataList,
      transactionSummaryData
    ] = parseCsvFileData(
      data.map(mapNullValuesToEmptyString),
      fileInfo.name,
      isSingleDebit
    );

    setCurrMainFormData(currMainFormData);
    setSubFormDataList(subFormDataList);
    setTransactionSummaryData(transactionSummaryData);
    isSingleDebit && setApplicantDetails(applicantDetails[0]);
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

  const paymentFileProps = {
    storeProps: store,
    isCreate: true,
    setShowPaymentFile,
    isSingleDebit,
    setIsSingleDebit
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
