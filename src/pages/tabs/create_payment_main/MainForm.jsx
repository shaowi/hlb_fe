import { Box } from '@mui/material';
import FormBuilder from 'components/forms_ui/FormBuilder';
import {
  COUNTRY_CODE,
  DEBIT_TYPE,
  FILENAME_FORMAT,
  RESIDENT_CODE
} from 'constants.js';
import { useCreatePaymentStore } from './create_payment_store';
import { MAIN_FILE_DETAILS } from './form_templates';

export default function MainForm({ handleSubmit }) {
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
  } = MAIN_FILE_DETAILS;

  const fileFormAttributes = {
    rows: [
      {
        fields: [
          {
            type: 'text',
            defaultValue: filename,
            componentProps: {
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
            type: 'select',
            defaultValue: debitType,
            componentProps: {
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
            type: 'text',
            defaultValue: channelTransactionReference,
            componentProps: {
              disabled: true,
              name: 'channelTransactionReference',
              label: 'Channel Transaction Reference',
              'data-testid': 'channelTransactionReference'
            }
          },
          {
            type: 'text',
            defaultValue: transactionType,
            componentProps: {
              disabled: true,
              name: 'transactionType',
              label: 'Transaction Type',
              'data-testid': 'transactionType'
            }
          },
          {
            type: 'text',
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
            type: 'date',
            defaultValue: transactionDate,
            componentProps: {
              disabled: true,
              name: 'transactionDate',
              label: 'Transaction Date',
              'data-testid': 'transactionDate'
            }
          },
          {
            type: 'date',
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
            type: 'date',
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
            type: 'text',
            defaultValue: recipientReference,
            componentProps: {
              name: 'recipientReference',
              label: 'Recipient Reference',
              'data-testid': 'recipientReference'
            }
          },
          {
            type: 'text',
            defaultValue: otherPaymentDetails,
            componentProps: {
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
    title: 'Applicant Details',
    rows: [
      {
        fields: [
          {
            type: 'text',
            defaultValue: applicantName,
            componentProps: {
              required: true,
              name: 'applicantName',
              label: 'Name',
              'data-testid': 'applicantName'
            }
          },
          {
            type: 'text',
            defaultValue: applicantAccountNo,
            componentProps: {
              required: true,
              name: 'applicantAccountNo',
              label: 'Account Number',
              'data-testid': 'applicantAccountNo',
              type: 'number'
            }
          },
          {
            type: 'text',
            defaultValue: applicantAccountType,
            componentProps: {
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
            type: 'text',
            defaultValue: applicantAccountCurrency,
            componentProps: {
              required: true,
              name: 'applicantAccountCurrency',
              label: 'Account Currency',
              'data-testid': 'applicantAccountCurrency'
            }
          },
          {
            type: 'text',
            defaultValue: applicantIdType,
            componentProps: {
              name: 'applicantIdType',
              label: 'ID Type',
              'data-testid': 'applicantIdType'
            }
          },
          {
            type: 'text',
            defaultValue: applicantId,
            componentProps: {
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
            type: 'text',
            defaultValue: applicantAccountBranchCode,
            componentProps: {
              required: true,
              name: 'applicantAccountBranchCode',
              label: 'Account Branch Code',
              'data-testid': 'applicantAccountBranchCode'
            }
          },
          {
            type: 'text',
            defaultValue: applicantBankBic,
            componentProps: {
              disabled: true,
              name: 'applicantBankBic',
              label: 'Bank BIC',
              'data-testid': 'applicantBankBic'
            }
          },
          {
            type: 'select',
            defaultValue: applicantResidentCode,
            componentProps: {
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
            type: 'text',
            defaultValue: applicantAccountCifId,
            componentProps: {
              name: 'applicantAccountCifId',
              label: 'Account CIF ID',
              'data-testid': 'applicantAccountCifId'
            }
          },
          {
            type: 'text',
            defaultValue: applicantPhone,
            componentProps: {
              name: 'applicantPhone',
              label: 'Phone',
              'data-testid': 'applicantPhone'
            }
          },
          {
            type: 'text',
            defaultValue: applicantPostalCode,
            componentProps: {
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
            type: 'text',
            defaultValue: applicantAddress1,
            componentProps: {
              required: true,
              name: 'applicantAddress1',
              label: 'Address 1',
              'data-testid': 'applicantAddress1',
              multiline: true,
              rows: 3
            }
          },
          {
            type: 'text',
            defaultValue: applicantAddress2,
            componentProps: {
              required: true,
              name: 'applicantAddress2',
              label: 'Address 2',
              'data-testid': 'applicantAddress2',
              multiline: true,
              rows: 3
            }
          },
          {
            type: 'text',
            defaultValue: applicantAddress3,
            componentProps: {
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
            type: 'select-autocomplete',
            defaultValue: applicantCountryCode,
            componentProps: {
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
    buttons: [
      {
        label: 'Add Transaction',
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
