import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, ButtonGroup } from '@mui/material';
import ActionButton from 'components/datatable/ActionButton';
import DataTable from 'components/datatable/index';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { useEffect, useState } from 'react';
import { formatToCurrency } from 'services/helper';
import MainForm from './MainForm';
import SubForm from './SubForm';
import { useCreatePaymentStore } from './create_payment_store';
import SummaryForm from './SummaryForm';

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
  const [transactionRows, setTransactionRows] = useState([]);
  const {
    subFormDataList,
    setSubFormDataList,
    setCurrSubFormData,
    resetCurrSubFormData,
    setApplicantDetails
  } = useCreatePaymentStore();

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
    // Add the last row of data list to the table
    setTransactionRows([
      ...transactionRows,
      mapToRow(
        transactionRows.length,
        subFormDataList[subFormDataListLength - 1]
      )
    ]);
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

  return (
    <Box spacing={2} xs={{ p: 3, mb: 5 }}>
      {subFormVisible ? (
        <SubForm
          handleSubmit={handleSubFormSubmit}
          setSubFormVisible={setSubFormVisible}
          isEdit={editRowNum !== -1}
        />
      ) : (
        <>
          <MainForm
            handleSubmit={(values) => {
              setApplicantDetails(values);
              setEditRowNum(-1);
              setSubFormVisible(true);
            }}
          />
          <DataTable
            title="Transaction Details"
            rows={transactionRows}
            columns={transactionColumns}
          />
          <SummaryForm transactionRows={transactionRows} />
        </>
      )}
    </Box>
  );
}
