import { Box, ThemeProvider } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import {
  COUNTRY_CODE,
  DEBIT_TYPE,
  FILENAME_FORMAT,
  RESIDENT_CODE
} from 'constants.js';
import { theme } from 'theme';
import { useCreatePaymentStore } from './create_payment_store';

const { TEXT, SELECT, SELECT_AUTOCOMPLETE, DATE } = FORM_TYPES;

export default function MainForm({
  handleSubmit,
  mainFileDetails,
  formButtons,
  disabled = false
}) {
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
  } = mainFileDetails;

  const fileFormAttributes = {
    rows: [
      {
        fields: [
          {
            type: TEXT,
            defaultValue: filename,
            componentProps: {
              autoFocus: true,
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
              disabled,
              required: true,
              name: 'debitType',
              label: 'Debit Type',
              'data-testid': 'debitType',
              options: DEBIT_TYPE
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

  const { applicantDetails } = useCreatePaymentStore();

  const {
    applicantName,
    applicantAccountNo,
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
            defaultValue: applicantAccountNo,
            componentProps: {
              disabled,
              required: true,
              name: 'applicantAccountNo',
              label: 'Account Number',
              'data-testid': 'applicantAccountNo',
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
            type: TEXT,
            defaultValue: applicantAccountCurrency,
            componentProps: {
              disabled,
              required: true,
              name: 'applicantAccountCurrency',
              label: 'Account Currency',
              'data-testid': 'applicantAccountCurrency'
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
              required: true,
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
              required: true,
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
    ]
  };

  const formAttributes = {
    sections: [fileFormAttributes, applicantFormAttributes],
    buttons: formButtons
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <FormBuilder onSubmit={handleSubmit} formAttributes={formAttributes} />
      </Box>
    </ThemeProvider>
  );
}
