import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, ButtonGroup } from '@mui/material';
import AlertDialog from 'components/AlertDialog';
import ModalBox from 'components/ModalBox';
import ActionButton from 'components/datatable/ActionButton';
import DataTable from 'components/datatable/index';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { useEffect, useState, useRef, useMemo } from 'react';
import ConfirmationPage from './ConfirmationPage';
import MainForm from './MainForm';
import SummaryForm from './SummaryForm';
import ReviewPage from './ReviewPage';
import SubForm from './SubForm';
import { transactionColumns } from '../shared/payment_store';
import {
  mapToApplicantDetails,
  mapToMainFileDetails
} from 'services/PaymentFileService';

export default function PaymentFile({
  storeProps,
  isCreate,
  setShowPaymentFile
}) {
  const formikRef = useRef();
  const [editRowNum, setEditRowNum] = useState(-1);
  const [subFormVisible, setSubFormVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const {
    applicantDetails,
    currSubFormData,
    currMainFormData,
    setCurrMainFormData,
    subFormDataList,
    transactionRows,
    setTransactionRows,
    setSubFormDataList,
    setCurrSubFormData,
    resetCurrSubFormData,
    setApplicantDetails,
    setRequesterComments,
    showConfirmationPage,
    setShowConfirmationPage,
    showReviewPage,
    setShowReviewPage,
    requesterComments,
    errorOnConfirm,
    setErrorOnConfirm,
    resetStore
  } = storeProps;

  // Keep the state and the table in sync
  useEffect(() => {
    const subFormDataListLength = subFormDataList.length;
    if (subFormDataListLength === 0) return;
    // Update the edited row in the table
    if (editRowNum !== -1) {
      const newTransactionRows = [...transactionRows];
      newTransactionRows[editRowNum] = mapToRow(
        editRowNum,
        subFormDataList[editRowNum]
      );
      setTransactionRows(newTransactionRows);
      setEditRowNum(-1);
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
    return {
      id,
      action: (
        <ButtonGroup variant="text" size="small">
          <ToolTipWrapper title="Edit">
            <ActionButton onClick={() => editTransactionRow(id)}>
              <EditIcon />
            </ActionButton>
          </ToolTipWrapper>
          <ToolTipWrapper title="Delete">
            <ActionButton
              color="error"
              onClick={() => deleteTransactionRow(id)}
            >
              <DeleteIcon />
            </ActionButton>
          </ToolTipWrapper>
        </ButtonGroup>
      ),
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
        index === editRowNum ? values : item
      )
    );
  }

  function handleSubFormSubmit(values) {
    if (editRowNum !== -1) {
      editTransaction(values);
    } else {
      addTransaction(values);
    }
    setSubFormVisible(false);
    resetCurrSubFormData();
  }

  function editTransactionRow(id) {
    setCurrSubFormData({ ...subFormDataList[id], id });
    setEditRowNum(id);
    if (formikRef.current) {
      // To update applicant details in subForm for any field changes made in mainForm
      formikRef.current.handleSubmit();
    }
  }

  function deleteTransactionRow(id) {
    setSubFormDataList(subFormDataList.filter((item) => item.id !== id));
    setTransactionRows(
      transactionRows
        .filter((row) => row.id !== id)
        .map((row, index) => {
          return { ...row, id: index };
        })
    );
  }

  function submitTransactions(values) {
    if (subFormDataList.length === 0) {
      setOpenAlert(true);
      return;
    }
    setRequesterComments(values.requesterComments);
    setIsModalOpen(true);
  }

  function closeAlert() {
    setOpenAlert(false);
  }

  function handleFileSubmit() {
    if (formikRef.current) {
      // To update applicant details in subForm for any field changes made in mainForm
      formikRef.current.handleSubmit();
    }
    setIsModalOpen(false);
    setShowConfirmationPage(true);
  }

  const modalProps = {
    title: 'Confirm',
    description: `Are you sure you want to submit the Payment File: ${currMainFormData.filename}?`,
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
          onClick: () => setIsModalOpen(false)
        }
      }
    ]
  };

  const formButtons = [
    isCreate
      ? {
          label: 'Add Transaction',
          componentProps: {
            color: 'success'
          }
        }
      : {
          label: 'Back',
          type: 'button',
          componentProps: {
            color: 'neutral',
            onClick: () => {
              setShowPaymentFile(false);
              resetStore();
            }
          }
        }
  ];

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
    ]
  };

  const {
    filename,
    debitType,
    channelTransactionReference,
    transactionType,
    transactionDate,
    valueDate,
    businessDate
  } = currMainFormData;
  const { processingMode, paymentCurrency } = subFormDataList[0] || {};
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

  const totalTransactionCount = transactionRows.length;
  const totalPaymentAmount = useMemo(() => {
    return transactionRows.reduce((acc, curr) => acc + curr.paymentAmount, 0);
  }, [transactionRows]);

  const confirmationPageProps = {
    applicantDetails,
    currSubFormData,
    currMainFormData,
    subFormDataList,
    requesterComments,
    setShowConfirmationPage,
    setShowReviewPage,
    setErrorOnConfirm,
    totalTransactionCount,
    totalPaymentAmount,
    isCreate
  };

  const summaryFormProps = {
    onSubmit: submitTransactions,
    totalTransactionCount,
    totalPaymentAmount,
    requesterComments
  };

  return (
    <Box spacing={2} xs={{ p: 3, mb: 5 }}>
      <ModalBox
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        {...modalProps}
      />
      <AlertDialog
        open={openAlert}
        handleClose={closeAlert}
        {...alertDialogProps}
      />
      {subFormVisible ? (
        <SubForm
          handleSubmit={handleSubFormSubmit}
          setSubFormVisible={setSubFormVisible}
          isEdit={editRowNum !== -1}
          currSubFormData={currSubFormData}
        />
      ) : showConfirmationPage ? (
        <ConfirmationPage {...confirmationPageProps} />
      ) : showReviewPage ? (
        <ReviewPage {...reviewPageProps} />
      ) : (
        <>
          <MainForm
            formikRef={formikRef}
            handleSubmit={(values) => {
              const updatedMainFormDetails = mapToMainFileDetails(
                currMainFormData,
                values
              );
              setCurrMainFormData(updatedMainFormDetails);
              const updatedApplicantDetails = mapToApplicantDetails(
                applicantDetails,
                values
              );
              setApplicantDetails(
                mapToApplicantDetails(applicantDetails, values)
              );

              // if modal is not open, then it is adding new transaction or editing existing transaction
              if (!isModalOpen) {
                setCurrSubFormData({
                  ...currSubFormData,
                  ...updatedMainFormDetails,
                  ...updatedApplicantDetails
                });
                setSubFormVisible(true);
              }
            }}
            currMainFormData={currMainFormData}
            applicantDetails={applicantDetails}
            formButtons={formButtons}
          />
          <DataTable
            title="Transaction Details"
            rows={transactionRows}
            columns={transactionColumns}
            emptyTableMessage="No transactions added"
          />
          <SummaryForm {...summaryFormProps} />
        </>
      )}
    </Box>
  );
}
