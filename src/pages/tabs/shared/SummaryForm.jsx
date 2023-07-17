import { Box } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';

const { TEXT } = FORM_TYPES;

/**
 * The SummaryForm component is a form that displays transaction summary information and allows the user to submit
 * requester comments.
 * @returns The SummaryForm component is being returned. It renders a form with transaction summary information and a
 * textarea for requester comments. The form has a submit button.
 */
export default function SummaryForm(props) {
  const {
    onSubmit,
    totalTransactionCount,
    totalPaymentAmount,
    transactionSummaryData: { requesterComments, reviewerComments },
    isCreate,
    setIsDeclinedSubmission
  } = props;

  const secondRow = [
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
  ];

  const buttons = [
    {
      label: 'Submit',
      componentProps: {
        color: 'success'
      }
    }
  ];

  if (!isCreate) {
    secondRow.splice(0, 0, {
      type: TEXT,
      defaultValue: reviewerComments,
      componentProps: {
        required: true,
        name: 'reviewerComments',
        label: 'Reviewer Comments',
        'data-testid': 'reviewerComments',
        multiline: true,
        rows: 3
      }
    });
    buttons.push({
      label: 'Decline',
      componentProps: {
        color: 'error',
        onClick: () => setIsDeclinedSubmission(true)
      }
    });
  }

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
            fields: secondRow
          }
        ]
      }
    ],
    buttons
  };

  const formBuilderProps = {
    onSubmit,
    formAttributes
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormBuilder {...formBuilderProps} />
    </Box>
  );
}
