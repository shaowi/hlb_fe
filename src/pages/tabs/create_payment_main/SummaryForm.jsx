import React from 'react';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { Box } from '@mui/material';

const { TEXT } = FORM_TYPES;
export default function SummaryForm({ transactionRows, handleSubmit }) {
  const totalTransactionCount = transactionRows.length;
  const totalPaymentAmount = transactionRows.reduce(
    (acc, curr) => acc + curr.paymentAmount,
    0
  );

  const transactionSummaryAttributes = {
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
            defaultValue: '',
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
  };

  const formAttributes = {
    sections: [transactionSummaryAttributes],
    buttons: [
      {
        label: 'Submit',
        color: 'success'
      }
    ]
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormBuilder onSubmit={handleSubmit} formAttributes={formAttributes} />
    </Box>
  );
}
