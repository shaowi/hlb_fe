import { Box } from '@mui/material';
import { useAppStore } from 'app_store';
import AlertDialog from 'components/AlertDialog';
import ModalBox from 'components/ModalBox';
import DataTable from 'components/datatable/index';
import { STATUSES, SUBMIT_TYPES } from 'constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  mapToApplicantDetails,
  mapToMainFileDetails
} from 'services/PaymentFileService';
import ConfirmationPage from './ConfirmationPage';
import MainForm from './MainForm';
import ReviewPage from './ReviewPage';
import SubForm from './SubForm';
import SummaryForm from './SummaryForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import ActionButtonGroup from 'components/datatable/ActionButtonGroup';

/**
 * The `PaymentFile` function is a React component that renders a form for creating or editing payment files, including
 * transaction details, and provides functionality for adding, editing, and deleting transactions.
 * @returns a JSX element.
 */
export default function PaymentFile(props) {
  const { isMaker } = useAppStore();
  const {
    storeProps,
    dataTableProps,
    isCreate,
    setShowPaymentFile,
    isSingleDebit,
    setIsSingleDebit,
    transactionsPassValidation
  } = props;
  const formikRef = useRef();
  const [selectedRowNum, setSelectedRowNum] = useState(-1);
  const [subFormVisible, setSubFormVisible] = useState(false);
  const [isSubmitPaymentModalOpen, setIsSubmitPaymentModalOpen] =
    useState(false);
  const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] =
    useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [submitType, setSubmitType] = useState(SUBMIT_TYPES.submit);
  const {
    applicantDetails,
    currSubFormData,
    currMainFormData,
    setCurrMainFormData,
    subFormDataList,
    transactionSummaryData,
    transactionRows,
    transactionColumns,
    setTransactionRows,
    setSubFormDataList,
    setCurrSubFormData,
    resetCurrSubFormData,
    resetSubFormDataList,
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
  const isRejectedFile = STATUSES[status] === STATUSES.rejected;
  const isFormEditable = isMaker && (isRejectedFile || isCreate);

  // Keep the state and the table in sync
  useEffect(() => {
    const rowMapperOtherProps = {
      isSingleDebit,
      isFormEditable,
      editTransactionRow,
      viewTransactionRow,
      handleDeleteTransactionRow,
      transactionsPassValidation
    };
    // Update the edited row in the table
    if (selectedRowNum !== -1) {
      const newTransactionRows = [...transactionRows];
      newTransactionRows[selectedRowNum] = mapToTransactionRow(
        selectedRowNum,
        subFormDataList[selectedRowNum],
        rowMapperOtherProps
      );
      setTransactionRows(newTransactionRows);
      setSelectedRowNum(-1);
      return;
    }
    setTransactionRows(
      subFormDataList.map((item, index) =>
        mapToTransactionRow(index, item, rowMapperOtherProps)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subFormDataList]);

  function handleDeleteTransactionRow(id) {
    setSelectedRowNum(id);
    setIsDeleteTransactionModalOpen(true);
  }

  function mapToTransactionRow(id, subFormData, otherProps) {
    let {
      channelTransactionReference,
      processingMode,
      applicantName,
      applicantAccountNumber,
      applicantAccountCurrency,
      applicantAccountType,
      beneficiaryName,
      beneficiaryAccountNumber,
      beneficiaryBankName,
      beneficiaryAccountBic,
      remittanceAmount,
      remittanceCurrency,
      paymentAmount,
      fxContractReferenceNo
    } = subFormData;
    const {
      isSingleDebit,
      isFormEditable,
      editTransactionRow,
      viewTransactionRow,
      handleDeleteTransactionRow,
      transactionsPassValidation
    } = otherProps;
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
                onClick: () => handleDeleteTransactionRow(id)
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
    beneficiaryAccountBic = beneficiaryAccountBic?.value;

    let rowData = {
      id,
      action,
      channelTransactionReference,
      processingMode,
      beneficiaryName,
      beneficiaryAccountNumber,
      beneficiaryBankName,
      beneficiaryAccountBic,
      remittanceCurrency,
      remittanceAmount,
      paymentAmount,
      fxContractReferenceNo
    };
    if (transactionsPassValidation) {
      const validationResultProps = transactionsPassValidation[id]
        ? {
            buttons: [
              {
                toolTipText: 'Valid Data',
                componentProps: {
                  disabled: true
                },
                icon: <CheckIcon />
              }
            ]
          }
        : {
            buttons: [
              {
                toolTipText: `Since the selected Remittance Currency (${remittanceCurrency?.value}) is ...`,
                componentProps: {
                  disabled: true
                },
                icon: <WarningIcon />
              }
            ]
          };
      rowData['validationResult'] = (
        <ActionButtonGroup {...validationResultProps} />
      );
    }
    if (!isSingleDebit) {
      rowData = {
        ...rowData,
        applicantName,
        applicantAccountNumber,
        applicantAccountCurrency,
        applicantAccountType
      };
    }
    return rowData;
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
    if (formikRef.current) {
      // To update applicant details in subForm for any field changes made in mainForm
      formikRef.current.handleSubmit();
    }
  }

  function closeAlert() {
    setOpenAlert(false);
  }

  function handleFileSubmit() {
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
    description: `Are you sure you want to ${submitType} the Payment File: ${filename}?`,
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
    disabled: !isFormEditable,
    isFormEditable,
    currSubFormData,
    resetCurrSubFormData,
    isSingleDebit
  };

  // remove action & validationResult columns if is uploaded file else remove only action column;
  const columns = transactionsPassValidation
    ? transactionColumns.slice(2)
    : transactionColumns.slice(1);
  const confirmationPageProps = {
    applicantDetails,
    currSubFormData,
    currMainFormData,
    subFormDataList,
    columns,
    transactionSummaryData,
    setShowConfirmationPage,
    setShowReviewPage,
    setErrorOnConfirm,
    totalTransactionCount,
    totalPaymentAmount,
    processingMode,
    paymentCurrency,
    isCreate,
    submitType,
    isMaker,
    isSingleDebit
  };

  const reviewButtonProps = isCreate
    ? {
        label: `Back to ${
          transactionsPassValidation ? 'Upload' : 'Create'
        } Outward Payment Request File`,
        type: 'button',
        componentProps: {
          color: 'neutral',
          onClick: () => {
            if (transactionsPassValidation) {
              setShowPaymentFile(false);
            }
            resetStore();
          }
        }
      }
    : {
        label: `Back to ${
          isMaker ? 'Rejected' : 'Review'
        } Outward Payment Request File`,
        type: 'button',
        componentProps: {
          color: 'neutral',
          onClick: () => window.location.reload()
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

  const mainFormProps = {
    formikRef,
    currMainFormData,
    applicantDetails,
    disabled: !isFormEditable,
    isCreate,
    isSingleDebit,
    setIsSingleDebit,
    resetCurrSubFormData,
    resetSubFormDataList,
    onSubmit: (values) => {
      const updatedMainFormDetails = mapToMainFileDetails(
        currMainFormData,
        values
      );
      setCurrMainFormData(updatedMainFormDetails);
      let updatedApplicantDetails = {};
      if (isSingleDebit) {
        updatedApplicantDetails = mapToApplicantDetails(
          applicantDetails,
          values
        );
        setApplicantDetails(mapToApplicantDetails(applicantDetails, values));
      }

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

  const summaryFormProps = {
    onSubmit: submitTransactions,
    totalTransactionCount,
    totalPaymentAmount,
    transactionSummaryData,
    setShowPaymentFile,
    resetStore,
    isRejectedFile,
    isCreate,
    isFormEditable,
    setSubmitType
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
