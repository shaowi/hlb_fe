import { Box } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { useMemo } from 'react';
import { useCreatePaymentStore } from './create_payment_store';
import { formatToCurrency } from 'services/helper';
import DataTable from 'components/datatable';

const { TEXT } = FORM_TYPES;

export default function ConfirmationSummaryForm({
  transactionRows,
  onSubmit,
  setShowConfirmationPage
}) {
  const totalTransactionCount = transactionRows.length;
  const totalPaymentAmount = useMemo(() => {
    return transactionRows.reduce(
      (acc, curr) => acc + curr.remittanceAmount,
      0
    );
  }, [transactionRows]);
  const { requesterComments } = useCreatePaymentStore();

  const summaryColumns = [
    {
      id: 'processingMode',
      label: 'Processing Mode',
      minWidth: 200
    },
    {
      id: 'transactionCount',
      label: 'Transaction Count',
      minWidth: 200
    },
    {
      id: 'paymentCurrency',
      label: 'Payment Currency',
      minWidth: 200
    },
    {
      id: 'totalPaymentAmount',
      label: 'Total Payment Amount',
      minWidth: 200,
      format: (value) => formatToCurrency(value)
    }
  ];

  const summaryRow = [
    {
      processingMode: 'Normal',
      transactionCount: totalTransactionCount,
      paymentCurrency: 'USD',
      totalPaymentAmount: totalPaymentAmount
    }
  ];

  const formAttributes = {
    sections: [
      {
        rows: [
          {
            fields: [
              {
                type: TEXT,
                defaultValue: requesterComments,
                componentProps: {
                  disabled: true,
                  name: 'requesterComments',
                  label: 'Requester Comments',
                  'data-testid': 'requesterComments',
                  multiline: true,
                  rows: 3
                }
              }
            ]
          }
        ]
      }
    ],
    buttons: [
      {
        label: 'Back',
        type: 'button',
        componentProps: {
          color: 'neutral',
          onClick: () => setShowConfirmationPage(false)
        }
      },
      {
        label: 'Confirm',
        componentProps: {
          color: 'success'
        }
      }
    ]
  };

  return (
    <Box sx={{ mt: 3 }}>
      <DataTable
        title="Summary"
        columns={summaryColumns}
        rows={summaryRow}
        showPagination={false}
      />
      <FormBuilder onSubmit={onSubmit} formAttributes={formAttributes} />
    </Box>
  );
}
