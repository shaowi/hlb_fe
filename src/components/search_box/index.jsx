import { Box } from '@mui/material';
import FormBuilder from 'components/forms_ui/FormBuilder';
import { STATUSES, currentDate, previousMonthDate } from 'constants.js';

export default function SearchBox() {
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
                type: 'text',
                defaultValue: '',
                componentProps: {
                  name: 'filename',
                  label: 'Filename',
                  'data-testid': 'filename'
                }
              },
              {
                type: 'select',
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
                type: 'date',
                defaultValue: previousMonthDate,
                componentProps: {
                  required: true,
                  name: 'businessDateFrom',
                  label: 'Business Date(From)',
                  'data-testid': 'businessDateFrom'
                }
              },
              {
                type: 'date',
                defaultValue: currentDate,
                componentProps: {
                  required: true,
                  name: 'businessDateTo',
                  label: 'Business Date(To)',
                  'data-testid': 'businessDateTo'
                }
              }
            ]
          },
          {
            fields: [
              {
                type: 'date',
                defaultValue: '',
                componentProps: {
                  name: 'transactionDateFrom',
                  label: 'Transaction Date(From)',
                  'data-testid': 'transactionDateFrom'
                }
              },
              {
                type: 'date',
                defaultValue: '',
                componentProps: {
                  name: 'transactionDateTo',
                  label: 'Transaction Date(To)',
                  'data-testid': 'transactionDateTo'
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
        color: 'success'
      },
      {
        label: 'Reset',
        isReset: true
      }
    ]
  };
  const handleSearch = (values) => {
    console.log(values);
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormBuilder onSubmit={handleSearch} formAttributes={formAttributes} />
    </Box>
  );
}
