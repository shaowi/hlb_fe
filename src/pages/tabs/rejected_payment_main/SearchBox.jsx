import { Box } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { STATUSES, currentDate, previousMonthDate } from 'constants';

const { TEXT, SELECT, DATE } = FORM_TYPES;

export default function SearchBox({ onSearch }) {
  const formAttributes = {
    sections: [
      {
        title: {
          value: 'Search Criteria',
          variant: 'h4'
        },
        rows: [
          {
            fields: [
              {
                type: TEXT,
                defaultValue: '',
                componentProps: {
                  name: 'filename',
                  label: 'Filename',
                  'data-testid': 'filename'
                }
              },
              {
                type: SELECT,
                defaultValue: '',
                componentProps: {
                  required: true,
                  name: 'status',
                  label: 'Status',
                  'data-testid': 'status',
                  options: STATUSES
                }
              }
            ]
          },
          {
            fields: [
              {
                type: DATE,
                defaultValue: previousMonthDate,
                componentProps: {
                  required: true,
                  name: 'businessDateFrom',
                  label: 'Business Date(From)',
                  'data-testid': 'businessDateFrom'
                }
              },
              {
                type: DATE,
                defaultValue: currentDate,
                componentProps: {
                  required: true,
                  name: 'businessDateTo',
                  label: 'Business Date(To)',
                  'data-testid': 'businessDateTo'
                },
                validateDateComparison: {
                  other: 'businessDateFrom',
                  func: ([businessDateFrom], schema) => {
                    return businessDateFrom
                      ? schema.min(
                          businessDateFrom,
                          'Business Date(To) must be later than Business Date(From)'
                        )
                      : schema;
                  }
                }
              }
            ]
          },
          {
            fields: [
              {
                type: DATE,
                defaultValue: '',
                componentProps: {
                  name: 'transactionDateFrom',
                  label: 'Transaction Date(From)',
                  'data-testid': 'transactionDateFrom'
                }
              },
              {
                type: DATE,
                defaultValue: '',
                componentProps: {
                  name: 'transactionDateTo',
                  label: 'Transaction Date(To)',
                  'data-testid': 'transactionDateTo'
                },
                validateDateComparison: {
                  other: 'transactionDateFrom',
                  func: ([transactionDateFrom], schema) => {
                    return transactionDateFrom
                      ? schema.min(
                          transactionDateFrom,
                          'Transaction Date(To) must be later than Transaction Date(From)'
                        )
                      : schema;
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    buttons: [
      {
        label: 'Search',
        componentProps: {
          color: 'success'
        }
      },
      {
        label: 'Reset',
        isReset: true
      }
    ]
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormBuilder onSubmit={onSearch} formAttributes={formAttributes} />
    </Box>
  );
}
