import { Box } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

const { TEXT } = FORM_TYPES;

export default function SummaryForm({ transactionRows, onSubmit }) {
  const totalTransactionCount = transactionRows.length;
  const totalPaymentAmount = transactionRows.reduce(
    (acc, curr) => acc + curr.remittanceAmount,
    0
  );

  const initFormAttributes = {
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
      }
    ],
    buttons: [
      {
        label: 'Submit',
        color: 'success'
      }
    ]
  };
  const [formAttributes, setFormAttributes] = useState(initFormAttributes);

  useEffect(() => {
    const formAttributesCopy = cloneDeep(formAttributes);
    formAttributesCopy.sections.forEach((section) => {
      section.rows.forEach((row) => {
        row.fields.forEach((field) => {
          if (field.componentProps.name === 'totalTransactionCount') {
            field.defaultValue = totalTransactionCount;
          }
          if (field.componentProps.name === 'totalPaymentAmount') {
            field.defaultValue = totalPaymentAmount;
          }
        });
      });
    });
    setFormAttributes(formAttributesCopy);
  }, [
    formAttributes,
    totalPaymentAmount,
    totalTransactionCount,
    transactionRows
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <FormBuilder onSubmit={onSubmit} formAttributes={formAttributes} />
    </Box>
  );
}
