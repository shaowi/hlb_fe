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
    setShowPaymentFile,
    resetStore,
    isRejectedFile,
    isCreate,
    setIsDeclinedSubmission,
    isMaker = true
  } = props;

  const secondRow = [
    {
      type: TEXT,
      defaultValue: requesterComments,
      componentProps: {
        required: isMaker,
        disabled: !isRejectedFile,
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

  if (isRejectedFile) {
    buttons.push.apply(buttons, [
      {
        label: 'Submit',
        componentProps: {
          color: 'success'
        }
      },
      {
        label: 'Decline',
        componentProps: {
          color: 'error',
          onClick: () => setIsDeclinedSubmission(true)
        }
      }
    ]);
  }

  if (isCreate) {
    // Replace back button with submit
    buttons.splice(0, 1, {
      label: 'Submit',
      componentProps: {
        color: 'success'
      }
    });
  } else {
    // Insert reviewerComments field at index 0
    secondRow.splice(0, 0, {
      type: TEXT,
      defaultValue: reviewerComments,
      componentProps: {
        required: !isMaker,
        disabled: isMaker,
        name: 'reviewerComments',
        label: 'Reviewer Comments',
        'data-testid': 'reviewerComments',
        multiline: true,
        rows: 3
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
