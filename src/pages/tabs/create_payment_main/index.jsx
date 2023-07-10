import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, ButtonGroup } from '@mui/material';
import ActionButton from 'components/datatable/ActionButton';
import DataTable from 'components/datatable/index';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { useEffect, useState } from 'react';
import { formatToCurrency } from 'services/helper';
import { MAIN_FILE_DETAILS } from '../form_templates';
import MainForm from './MainForm';
import SubForm from './SubForm';
import SummaryForm from './SummaryForm';
import { useCreatePaymentStore } from './create_payment_store';
import ModalBox from 'components/ModalBox';
import ConfirmationPage from './ConfirmationPage';
import AlertDialog from 'components/AlertDialog';
import ReviewPage from './ReviewPage';

const transactionColumns = [
  { id: 'action', label: 'Action', minWidth: 160, sortable: false },
  {
    id: 'channelTransactionReference',
    label: 'Channel Transaction Reference',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'processingMode',
    label: 'Processing Mode',
    minWidth: 100,
    sortable: true
  },
  {
    id: 'beneficiaryName',
    label: 'Beneficiary Name',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'beneficiaryAccountNo',
    label: 'Beneficiary Account Number',
    minWidth: 120,
    sortable: true
  },
  {
    id: 'beneficiaryBankName',
    label: 'Beneficiary Bank Name',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'beneficiaryAccountBic',
    label: 'Beneficiary Account Bic',
    minWidth: 170,
    sortable: true
  },
  {
    id: 'remittanceAmount',
    label: 'Remittance Amount',
    minWidth: 120,
    sortable: true,
    format: (value) => formatToCurrency(value)
  },
  {
    id: 'fxContractReferenceNo',
    label: 'FX Contract Reference Number',
    minWidth: 170,
    sortable: true
  }
];

export default function CreatePaymentMain() {
  const [editRowNum, setEditRowNum] = useState(-1);
  const [subFormVisible, setSubFormVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const {
    applicantDetails,
    currMainFormData,
    subFormDataList,
    transactionRows,
    setSubFormDataList,
    setTransactionRows,
    setCurrSubFormData,
    resetCurrSubFormData,
    setApplicantDetails,
    setRequesterComments,
    showConfirmationPage,
    setShowConfirmationPage,
    showReviewPage,
    errorInCreation
  } = useCreatePaymentStore();

  const modalProps = {
    title: 'Confirm',
    description: `Are you sure you want to submit the Payment File: ${currMainFormData.filename}?`,
    buttons: [
      {
        type: 'button',
        label: 'Yes',
        componentProps: {
          color: 'success',
          onClick: () => {
            setIsModalOpen(false);
            setShowConfirmationPage(true);
          }
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
        index === values.id ? values : item
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
    setSubFormVisible(true);
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

  const formButtons = [
    {
      label: 'Add Transaction',
      componentProps: {
        color: 'success'
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
  const reviewPageProps = {
    title:
      'Outward ISS 1-M CBFT Credit Transfer (MT103) Payment File Request Summary',
    subTitle: {
      severity: errorInCreation ? 'error' : 'success',
      text: `Outward ISS 1-M CBFT Credit Transfer (MT103) Payment File Request Submitted ${
        errorInCreation ? 'Unsuccessfully' : 'Successfully'
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
        value: applicantDetails.applicantAccountCurrency
      },
      { label: 'Debit Type', value: debitType },
      { label: 'Transaction Date', value: transactionDate },
      { label: 'Value Date', value: valueDate },
      { label: 'Business Date', value: businessDate }
    ]
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
        />
      ) : showConfirmationPage ? (
        <ConfirmationPage />
      ) : showReviewPage ? (
        <ReviewPage {...reviewPageProps} />
      ) : (
        <>
          <MainForm
            handleSubmit={(values) => {
              setApplicantDetails(values);
              setEditRowNum(-1);
              setSubFormVisible(true);
            }}
            mainFileDetails={MAIN_FILE_DETAILS}
            formButtons={formButtons}
          />
          <DataTable
            title="Transaction Details"
            rows={transactionRows}
            columns={transactionColumns}
            emptyTableMessage="No transactions added"
          />
          <SummaryForm onSubmit={submitTransactions} />
        </>
      )}
    </Box>
  );
}
