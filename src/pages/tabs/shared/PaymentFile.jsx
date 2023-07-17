import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from '@mui/material';
import AlertDialog from 'components/AlertDialog';
import ModalBox from 'components/ModalBox';
import ActionButtonGroup from 'components/datatable/ActionButtonGroup';
import DataTable from 'components/datatable/index';
import { STATUSES } from 'constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  mapToApplicantDetails,
  mapToMainFileDetails
} from 'services/PaymentFileService';
import { transactionColumns } from '../shared/payment_store';
import ConfirmationPage from './ConfirmationPage';
import MainForm from './MainForm';
import ReviewPage from './ReviewPage';
import SubForm from './SubForm';
import SummaryForm from './SummaryForm';

/**
 * The `PaymentFile` function is a React component that renders a form for creating or editing payment files, including
 * transaction details, and provides functionality for adding, editing, and deleting transactions.
 * @returns a JSX element.
 */
const { rejected } = STATUSES;
export default function PaymentFile(props) {
  const { storeProps, isCreate, setShowPaymentFile } = props;
  const formikRef = useRef();
  const [selectedRowNum, setSelectedRowNum] = useState(-1);
  const [subFormVisible, setSubFormVisible] = useState(false);
  const [isSubmitPaymentModalOpen, setIsSubmitPaymentModalOpen] =
    useState(false);
  const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] =
    useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isDeclinedSubmission, setIsDeclinedSubmission] = useState(false);
  const {
    applicantDetails,
    currSubFormData,
    currMainFormData,
    setCurrMainFormData,
    subFormDataList,
    transactionSummaryData,
    transactionRows,
    setTransactionRows,
    setSubFormDataList,
    setCurrSubFormData,
    resetCurrSubFormData,
    setApplicantDetails,
    setTransactionSummaryData,
    showConfirmationPage,
    setShowConfirmationPage,
    showReviewPage,
    setShowReviewPage,
    errorOnConfirm,
    setErrorOnConfirm,
    resetStore
  } = storeProps;
  const { processingMode, paymentCurrency } = subFormDataList[0] || {};
  const totalTransactionCount = transactionRows.length;
  const totalPaymentAmount = useMemo(() => {
    return transactionRows.reduce((acc, curr) => acc + curr.paymentAmount, 0);
  }, [transactionRows]);
  const {
    status,
    filename,
    debitType,
    channelTransactionReference,
    transactionType,
    transactionDate,
    valueDate,
    businessDate
  } = currMainFormData;
  const isRejectedFile = STATUSES[status] === rejected;
  const isFormEditable = isRejectedFile || isCreate;

  // Keep the state and the table in sync
  useEffect(() => {
    // Update the edited row in the table
    if (selectedRowNum !== -1) {
      const newTransactionRows = [...transactionRows];
      newTransactionRows[selectedRowNum] = mapToRow(
        selectedRowNum,
        subFormDataList[selectedRowNum]
      );
      setTransactionRows(newTransactionRows);
      setSelectedRowNum(-1);
      return;
    }
    setTransactionRows(
      subFormDataList.map((item, index) => mapToRow(index, item))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subFormDataList]);

  function mapToRow(
    id,
    {
      channelTransactionReference,
      processingMode,
      beneficiaryName,
      beneficiaryAccountNo,
      beneficiaryBankName,
      beneficiaryAccountBic,
      remittanceAmount,
      paymentAmount,
      fxContractReferenceNo
    }
  ) {
    const actionButtonProps = isFormEditable
      ? {
          buttons: [
            {
              toolTipText: 'Edit Transaction',
              componentProps: {
                onClick: () => editTransactionRow(id)
              },
              icon: <EditIcon />
            },
            {
              toolTipText: 'Delete Transaction',
              componentProps: {
                color: 'error',
                onClick: () => {
                  setSelectedRowNum(id);
                  setIsDeleteTransactionModalOpen(true);
                }
              },
              icon: <DeleteIcon />
            }
          ]
        }
      : {
          buttons: [
            {
              toolTipText: 'View Transaction',
              componentProps: {
                onClick: () => viewTransactionRow(id)
              },
              icon: <VisibilityIcon />
            }
          ]
        };
    const action = <ActionButtonGroup {...actionButtonProps} />;

    return {
      id,
      action,
      channelTransactionReference,
      processingMode,
      beneficiaryName,
      beneficiaryAccountNo,
      beneficiaryBankName,
      beneficiaryAccountBic: beneficiaryAccountBic?.value,
      remittanceAmount,
      paymentAmount,
      fxContractReferenceNo
    };
  }

  function addTransaction(values) {
    const withId = { ...values, id: subFormDataList.length };
    setSubFormDataList([...subFormDataList, withId]);
  }

  function editTransaction(values) {
    setSubFormDataList(
      subFormDataList.map((item, index) =>
        index === selectedRowNum ? values : item
      )
    );
  }

  function handleSubFormSubmit(values) {
    if (selectedRowNum !== -1) {
      editTransaction(values);
    } else {
      addTransaction(values);
    }
    setSubFormVisible(false);
    resetCurrSubFormData();
  }

  function editTransactionRow(id) {
    setCurrSubFormData({ ...subFormDataList[id], id });
    setSelectedRowNum(id);
    if (formikRef.current) {
      // To update applicant details in subForm for any field changes made in mainForm
      formikRef.current.handleSubmit();
    }
  }

  function deleteTransactionRow(rowNum) {
    setSubFormDataList(subFormDataList.filter((_, index) => rowNum !== index));
    setSelectedRowNum(-1);
    setIsDeleteTransactionModalOpen(false);
  }

  function viewTransactionRow(id) {
    setCurrSubFormData({ ...subFormDataList[id], id });
    setSelectedRowNum(id);
    setSubFormVisible(true);
  }

  function submitTransactions(values) {
    if (subFormDataList.length === 0) {
      setOpenAlert(true);
      return;
    }
    const { requesterComments, reviewerComments } = values;
    setTransactionSummaryData({ requesterComments, reviewerComments });
    setIsSubmitPaymentModalOpen(true);
  }

  function closeAlert() {
    setOpenAlert(false);
  }

  function handleFileSubmit() {
    if (formikRef.current) {
      // To update applicant details in subForm for any field changes made in mainForm
      formikRef.current.handleSubmit();
    }
    setIsSubmitPaymentModalOpen(false);
    setShowConfirmationPage(true);
  }

  const deleteTransactionModalProps = {
    title: 'Delete Transaction',
    description: `Are you sure you want to delete transaction ${transactionRows[selectedRowNum]?.channelTransactionReference}?`,
    buttons: [
      {
        type: 'button',
        label: 'Yes',
        componentProps: {
          color: 'success',
          onClick: () => deleteTransactionRow(selectedRowNum)
        }
      },
      {
        type: 'button',
        label: 'No',
        componentProps: {
          color: 'error',
          onClick: () => setIsDeleteTransactionModalOpen(false)
        }
      }
    ],
    isOpen: isDeleteTransactionModalOpen,
    handleClose: () => setIsDeleteTransactionModalOpen(false)
  };

  const submitPaymentModalProps = {
    title: 'Confirm',
    description: `Are you sure you want to ${
      isDeclinedSubmission ? 'decline' : 'submit'
    } the Payment File: ${filename}?`,
    buttons: [
      {
        type: 'button',
        label: 'Yes',
        componentProps: {
          color: 'success',
          onClick: handleFileSubmit
        }
      },
      {
        type: 'button',
        label: 'No',
        componentProps: {
          color: 'error',
          onClick: () => setIsSubmitPaymentModalOpen(false)
        }
      }
    ],
    isOpen: isSubmitPaymentModalOpen,
    handleClose: () => setIsSubmitPaymentModalOpen(false)
  };

  const alertDialogProps = {
    title: 'Error in submitting',
    content: 'Please add at least one transaction to proceed',
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
    open: openAlert,
    handleClose: closeAlert
  };

  const subFormProps = {
    onSubmit: handleSubFormSubmit,
    setSubFormVisible,
    isEdit: selectedRowNum !== -1,
    disabled: !isRejectedFile,
    isFormEditable,
    currSubFormData
  };

  const confirmationPageProps = {
    applicantDetails,
    currSubFormData,
    currMainFormData,
    subFormDataList,
    transactionSummaryData,
    setShowConfirmationPage,
    setShowReviewPage,
    setErrorOnConfirm,
    totalTransactionCount,
    totalPaymentAmount,
    processingMode,
    paymentCurrency,
    isCreate,
    isDeclinedSubmission
  };

  const reviewButtonProps = isCreate
    ? {
        label: 'Back to Create Outward Payment Request File',
        type: 'button',
        componentProps: {
          color: 'neutral',
          onClick: resetStore
        }
      }
    : {
        label: 'Back to Rejected Outward Payment Request File',
        type: 'button',
        componentProps: {
          color: 'neutral',
          onClick: () => {
            resetStore();
            setShowPaymentFile(false);
          }
        }
      };
  const reviewPageProps = {
    title:
      'Outward ISS 1-M CBFT Credit Transfer (MT103) Payment File Request Summary',
    subTitle: {
      severity: errorOnConfirm ? 'error' : 'success',
      text: `Outward ISS 1-M CBFT Credit Transfer (MT103) Payment File Request Submitted ${
        errorOnConfirm ? 'Unsuccessfully' : 'Successfully'
      }`
    },
    body: [
      { label: 'Filename', value: filename },
      { label: 'File Reference', value: channelTransactionReference },
      {
        label: 'Transaction Type',
        value: transactionType
      },
      { label: 'Total Transaction Count', value: transactionRows.length },
      {
        label: 'Payment Currency',
        value: paymentCurrency
      },
      { label: 'Debit Type', value: debitType },
      { label: 'Transaction Date', value: transactionDate },
      { label: 'Value Date', value: valueDate },
      { label: 'Business Date', value: businessDate }
    ],
    transactionRows,
    processingMode,
    paymentCurrency,
    buttonProps: reviewButtonProps
  };

  const mainFormButtons = [
    {
      label: 'Add Transaction',
      componentProps: {
        color: 'success'
      }
    }
  ];
  const mainFormProps = {
    formikRef,
    currMainFormData,
    applicantDetails,
    formButtons: isCreate && mainFormButtons,
    disabled: !isRejectedFile,
    onSubmit: (values) => {
      const updatedMainFormDetails = mapToMainFileDetails(
        currMainFormData,
        values
      );
      setCurrMainFormData(updatedMainFormDetails);
      const updatedApplicantDetails = mapToApplicantDetails(
        applicantDetails,
        values
      );
      setApplicantDetails(mapToApplicantDetails(applicantDetails, values));

      // if modal is not open, then it is adding new transaction or editing existing transaction
      if (!isSubmitPaymentModalOpen) {
        setCurrSubFormData({
          ...currSubFormData,
          ...updatedMainFormDetails,
          ...updatedApplicantDetails
        });
        setSubFormVisible(true);
      }
    }
  };

  const dataTableProps = {
    title: 'Transaction Details',
    rows: transactionRows,
    columns: transactionColumns,
    emptyTableMessage: 'No transactions added'
  };

  const summaryFormProps = {
    onSubmit: submitTransactions,
    totalTransactionCount,
    totalPaymentAmount,
    transactionSummaryData,
    setShowPaymentFile,
    resetStore,
    isRejectedFile,
    isCreate,
    setIsDeclinedSubmission
  };

  return (
    <Box spacing={2} xs={{ p: 3, mb: 5 }}>
      <ModalBox {...submitPaymentModalProps} />
      <ModalBox {...deleteTransactionModalProps} />
      <AlertDialog {...alertDialogProps} />
      {subFormVisible ? (
        <SubForm {...subFormProps} />
      ) : showConfirmationPage ? (
        <ConfirmationPage {...confirmationPageProps} />
      ) : showReviewPage ? (
        <ReviewPage {...reviewPageProps} />
      ) : (
        <>
          <MainForm {...mainFormProps} />
          <DataTable {...dataTableProps} />
          <SummaryForm {...summaryFormProps} />
        </>
      )}
    </Box>
  );
}
