import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, ButtonGroup } from '@mui/material';
import ActionButton from 'components/datatable/ActionButton';
import DataTable from 'components/datatable/index';
import ToolTipWrapper from 'components/forms_ui/ToolTipWrapper';
import { useState, useEffect } from 'react';
import { formatToCurrency } from 'services/helper';
import MainForm from './MainForm';
import SubForm from './SubForm';
import { useCreatePaymentStore } from './create_payment_store';

export default function CreatePaymentMain() {
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
            <ActionButton onClick={() => editSubForm(id)}>
              <EditIcon />
            </ActionButton>
          </ToolTipWrapper>
          <ToolTipWrapper title="Delete">
            <ActionButton
              color="error"
              onClick={() =>
                console.log(`transaction details row ${id}:delete`)
              }
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

  const [subFormVisible, setSubFormVisible] = useState(false);
  const [transactionRows, setTransactionRows] = useState([]);
  const {
    subFormDataList,
    setSubFormDataList,
    setCurrSubFormData,
    setApplicantDetails
  } = useCreatePaymentStore();

  // Keep the state and the table in sync
  useEffect(() => {
    const subFormDataListLength = subFormDataList.length;
    if (subFormDataListLength === 0) return;
    setTransactionRows([
      ...transactionRows,
      mapToRow(
        transactionRows.length,
        subFormDataList[subFormDataListLength - 1]
      )
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subFormDataList]);

  const addTransaction = (values) => {
    console.log(values);
    console.log('add transaction');
    console.log(subFormDataList);
    console.log('transaction rows');
    console.log(transactionRows);
    setSubFormDataList([...subFormDataList, values]);
    setSubFormVisible(false);
  };

  function editSubForm(id) {
    console.log('edit sub form');
    console.log(subFormDataList);
    console.log('transaction rows');
    console.log(transactionRows);
    setCurrSubFormData(subFormDataList[id]);
    setSubFormVisible(true);
  }

  return (
    <Box spacing={2} xs={{ p: 3, mb: 5 }}>
      {subFormVisible ? (
        <SubForm
          handleSubmit={addTransaction}
          setSubFormVisible={setSubFormVisible}
        />
      ) : (
        <>
          <MainForm
            handleSubmit={(values) => {
              setApplicantDetails(values);
              setSubFormVisible(true);
            }}
          />
          <DataTable
            title="Transaction Details"
            rows={transactionRows}
            columns={transactionColumns}
          />
        </>
      )}
    </Box>
  );
}
