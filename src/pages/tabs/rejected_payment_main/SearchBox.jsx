import { Box } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import { STATUSES } from 'constant';

const { TEXT, SELECT, DATE } = FORM_TYPES;

/**
 * The SearchBox component is a form that allows users to input search criteria and submit a search.
 * @returns a JSX element. It is rendering a `<Box>` component from the Material-UI library, with a padding of 3. Inside
 * the `<Box>` component, it is rendering a `<FormBuilder>` component with the `formBuilderProps` passed as props.
 */
export default function SearchBox({ onSearch, initialFormValues }) {
  const {
    filename,
    status,
    businessDateFrom,
    businessDateTo,
    transactionDateFrom,
    transactionDateTo
  } = initialFormValues;

  const rowOne = [
    {
      type: TEXT,
      defaultValue: filename,
      componentProps: {
        name: 'filename',
        label: 'Filename',
        'data-testid': 'filename'
      }
    }
  ];
  if (status) {
    rowOne.push({
      type: SELECT,
      defaultValue: status,
      componentProps: {
        required: true,
        name: 'status',
        label: 'Status',
        'data-testid': 'status',
        options: STATUSES
      }
    });
  }

  const formAttributes = {
    sections: [
      {
        title: {
          value: 'Search Criteria',
          variant: 'h4'
        },
        rows: [
          {
            fields: rowOne
          },
          {
            fields: [
              {
                type: DATE,
                defaultValue: businessDateFrom,
                componentProps: {
                  required: true,
                  name: 'businessDateFrom',
                  label: 'Business Date(From)',
                  'data-testid': 'businessDateFrom'
                }
              },
              {
                type: DATE,
                defaultValue: businessDateTo,
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
                defaultValue: transactionDateFrom,
                componentProps: {
                  name: 'transactionDateFrom',
                  label: 'Transaction Date(From)',
                  'data-testid': 'transactionDateFrom'
                }
              },
              {
                type: DATE,
                defaultValue: transactionDateTo,
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
        type: 'reset',
        label: 'Reset'
      }
    ]
  };

  const formBuilderProps = {
    onSubmit: onSearch,
    formAttributes
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormBuilder {...formBuilderProps} />
    </Box>
  );
}
