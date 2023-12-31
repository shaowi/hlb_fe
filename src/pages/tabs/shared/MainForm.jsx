import { Box, ThemeProvider } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import {
  COUNTRY_CODE,
  DEBIT_TYPE,
  FILENAME_FORMAT,
  REMITTANCE_CURRENCY,
  RESIDENT_CODE
} from 'constant';
import { theme } from 'theme';

const { TEXT, SELECT, SELECT_AUTOCOMPLETE, DATE } = FORM_TYPES;

/**
 * The `MainForm` component is a React component that renders a form with multiple sections and fields, including file form
 * attributes and applicant form attributes.
 * @returns a JSX element.
 */
export default function MainForm(props) {
  const {
    onSubmit,
    currMainFormData,
    applicantDetails,
    isCreate,
    isSingleDebit,
    setIsSingleDebit,
    disabled = false,
    formikRef,
    setSelectedRowNum,
    resetCurrSubFormData,
    resetSubFormDataList
  } = props;
  const {
    filename,
    debitType,
    channelTransactionReference,
    transactionType,
    requestChannel,
    transactionDate,
    valueDate,
    businessDate,
    recipientReference,
    otherPaymentDetails
  } = currMainFormData;

  const fileFormAttributes = {
    rows: [
      {
        fields: [
          {
            type: TEXT,
            defaultValue: filename,
            componentProps: {
              disabled,
              name: 'filename',
              label: 'Filename',
              'data-testid': 'filename'
            },
            toolTipProps: {
              title: FILENAME_FORMAT,
              placement: 'top'
            }
          },
          {
            type: SELECT,
            defaultValue: debitType,
            componentProps: {
              disabled: disabled || !isCreate,
              required: true,
              name: 'debitType',
              label: 'Debit Type',
              'data-testid': 'debitType',
              options: DEBIT_TYPE,
              onChange: (_, newVal) => {
                setIsSingleDebit(newVal === 'single');
                setSelectedRowNum(-1);
                resetCurrSubFormData();
                resetSubFormDataList();
              }
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: channelTransactionReference,
            componentProps: {
              disabled: true,
              name: 'channelTransactionReference',
              label: 'Channel Transaction Reference',
              'data-testid': 'channelTransactionReference'
            }
          },
          {
            type: TEXT,
            defaultValue: transactionType,
            componentProps: {
              disabled: true,
              name: 'transactionType',
              label: 'Transaction Type',
              'data-testid': 'transactionType'
            }
          },
          {
            type: TEXT,
            defaultValue: requestChannel,
            componentProps: {
              disabled: true,
              name: 'requestChannel',
              label: 'Request Channel',
              'data-testid': 'requestChannel'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: DATE,
            defaultValue: transactionDate,
            componentProps: {
              disabled: true,
              name: 'transactionDate',
              label: 'Transaction Date',
              'data-testid': 'transactionDate'
            }
          },
          {
            type: DATE,
            defaultValue: valueDate,
            componentProps: {
              disabled: true,
              required: true,
              name: 'valueDate',
              label: 'Value Date',
              'data-testid': 'valueDate'
            },
            validateDateComparison: {
              other: 'businessDate',
              func: ([businessDate], schema) => {
                return businessDate
                  ? schema.notOneOf(
                      [businessDate],
                      'Value date must be current date'
                    )
                  : schema;
              }
            }
          },
          {
            type: DATE,
            defaultValue: businessDate,
            componentProps: {
              disabled: true,
              name: 'businessDate',
              label: 'Business Date',
              'data-testid': 'businessDate'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: recipientReference,
            componentProps: {
              disabled,
              name: 'recipientReference',
              label: 'Recipient Reference',
              'data-testid': 'recipientReference'
            }
          },
          {
            type: TEXT,
            defaultValue: otherPaymentDetails,
            componentProps: {
              disabled,
              name: 'otherPaymentDetails',
              label: 'Other Payment Details',
              multiline: true,
              rows: 3,
              'data-testid': 'otherPaymentDetails'
            }
          }
        ]
      }
    ]
  };

  const {
    applicantName,
    applicantAccountNumber,
    applicantAccountType,
    applicantAccountCurrency,
    applicantIdType,
    applicantId,
    applicantAccountBranchCode,
    applicantBankBic,
    applicantResidentCode,
    applicantAccountCifId,
    applicantPhone,
    applicantPostalCode,
    applicantAddress1,
    applicantAddress2,
    applicantAddress3,
    applicantCountryCode
  } = applicantDetails;

  const applicantFormAttributes = {
    title: {
      value: 'Applicant Details',
      variant: 'h5'
    },
    rows: [
      {
        fields: [
          {
            type: TEXT,
            defaultValue: applicantName,
            componentProps: {
              disabled,
              required: true,
              name: 'applicantName',
              label: 'Name',
              'data-testid': 'applicantName'
            }
          },
          {
            type: TEXT,
            defaultValue: applicantAccountNumber,
            componentProps: {
              disabled,
              required: true,
              name: 'applicantAccountNumber',
              label: 'Account Number',
              'data-testid': 'applicantAccountNumber',
              type: 'number'
            }
          },
          {
            type: TEXT,
            defaultValue: applicantAccountType,
            componentProps: {
              disabled,
              required: true,
              name: 'applicantAccountType',
              label: 'Account Type',
              'data-testid': 'applicantAccountType'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: SELECT_AUTOCOMPLETE,
            defaultValue: applicantAccountCurrency,
            componentProps: {
              disabled,
              required: true,
              name: 'applicantAccountCurrency',
              label: 'Account Currency',
              'data-testid': 'applicantAccountCurrency',
              options: REMITTANCE_CURRENCY
            }
          },
          {
            type: TEXT,
            defaultValue: applicantIdType,
            componentProps: {
              disabled,
              name: 'applicantIdType',
              label: 'ID Type',
              'data-testid': 'applicantIdType'
            }
          },
          {
            type: TEXT,
            defaultValue: applicantId,
            componentProps: {
              disabled,
              name: 'applicantId',
              label: 'ID',
              'data-testid': 'applicantId'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: applicantAccountBranchCode,
            componentProps: {
              disabled,
              required: true,
              name: 'applicantAccountBranchCode',
              label: 'Account Branch Code',
              'data-testid': 'applicantAccountBranchCode'
            }
          },
          {
            type: TEXT,
            defaultValue: applicantBankBic,
            componentProps: {
              disabled: true,
              name: 'applicantBankBic',
              label: 'Bank BIC',
              'data-testid': 'applicantBankBic'
            }
          },
          {
            type: SELECT,
            defaultValue: applicantResidentCode,
            componentProps: {
              disabled,
              name: 'applicantResidentCode',
              label: 'Resident Code',
              'data-testid': 'applicantResidentCode',
              options: RESIDENT_CODE
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: applicantAccountCifId,
            componentProps: {
              disabled,
              name: 'applicantAccountCifId',
              label: 'Account CIF ID',
              'data-testid': 'applicantAccountCifId'
            }
          },
          {
            type: TEXT,
            defaultValue: applicantPhone,
            componentProps: {
              disabled,
              name: 'applicantPhone',
              label: 'Phone',
              'data-testid': 'applicantPhone'
            }
          },
          {
            type: TEXT,
            defaultValue: applicantPostalCode,
            componentProps: {
              disabled,
              name: 'applicantPostalCode',
              label: 'Postal Code',
              'data-testid': 'applicantPostalCode'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: applicantAddress1,
            componentProps: {
              disabled,
              required: true,
              name: 'applicantAddress1',
              label: 'Address 1',
              'data-testid': 'applicantAddress1',
              multiline: true,
              rows: 3
            }
          },
          {
            type: TEXT,
            defaultValue: applicantAddress2,
            componentProps: {
              disabled,
              name: 'applicantAddress2',
              label: 'Address 2',
              'data-testid': 'applicantAddress2',
              multiline: true,
              rows: 3
            }
          },
          {
            type: TEXT,
            defaultValue: applicantAddress3,
            componentProps: {
              disabled,
              name: 'applicantAddress3',
              label: 'Address 3',
              'data-testid': 'applicantAddress3',
              multiline: true,
              rows: 3
            }
          }
        ]
      },
      {
        fields: [
          {
            type: SELECT_AUTOCOMPLETE,
            defaultValue: applicantCountryCode,
            componentProps: {
              disabled,
              required: true,
              disablePortal: true,
              id: 'applicantCountryCode',
              name: 'applicantCountryCode',
              label: 'Country Code',
              'data-testid': 'applicantCountryCode',
              options: COUNTRY_CODE
            }
          }
        ]
      }
    ],
    hidden: !isSingleDebit
  };

  const buttons = !disabled && [
    {
      label: 'Add Transaction',
      componentProps: {
        color: 'success'
      }
    }
  ];
  const formAttributes = {
    sections: [fileFormAttributes, applicantFormAttributes],
    buttons
  };

  const formBuilderProps = {
    onSubmit,
    formAttributes,
    formikRef
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <FormBuilder {...formBuilderProps} />
      </Box>
    </ThemeProvider>
  );
}
