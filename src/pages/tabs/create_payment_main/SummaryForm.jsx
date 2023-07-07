import { Box } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { useMemo } from 'react';
import { useCreatePaymentStore } from './create_payment_store';

const { TEXT } = FORM_TYPES;

export default function SummaryForm({ onSubmit }) {
  const { requesterComments, transactionRows } = useCreatePaymentStore();
  const totalTransactionCount = transactionRows.length;
  const totalPaymentAmount = useMemo(() => {
    return transactionRows.reduce(
      (acc, curr) => acc + curr.remittanceAmount,
      0
    );
  }, [transactionRows]);

  const formAttributes = {
    sections: [
      {
        title: {
          value: 'Transaction Summary',
          variant: 'h5'
        },
        rows: [
          {
            fields: [
              {
                type: TEXT,
                defaultValue: totalTransactionCount,
                componentProps: {
                  disabled: true,
                  name: 'totalTransactionCount',
                  label: 'Total Transaction Count',
                  'data-testid': 'totalTransactionCount',
                  type: 'number'
                }
              },
              {
                type: TEXT,
                defaultValue: totalPaymentAmount,
                componentProps: {
                  disabled: true,
                  name: 'totalPaymentAmount',
                  label: 'Total Payment Amount',
                  'data-testid': 'totalPaymentAmount',
                  type: 'number'
                }
              }
            ]
          },
          {
            fields: [
              {
                type: TEXT,
                defaultValue: requesterComments,
                componentProps: {
                  required: true,
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
        label: 'Submit',
        componentProps: {
          color: 'success'
        }
      }
    ]
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormBuilder onSubmit={onSubmit} formAttributes={formAttributes} />
    </Box>
  );
}
