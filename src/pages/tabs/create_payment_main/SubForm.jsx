import { Box, ThemeProvider, createTheme } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import {
  ACCOUNT_BIC,
  CHARGE_BEARER,
  COUNTRY_CODE,
  DEBIT_TYPE,
  REMITTANCE_CURRENCY,
  RESIDENT_CODE
} from 'constants.js';
import { useCreatePaymentStore } from './create_payment_store';

const { TEXT, SELECT, SELECT_AUTOCOMPLETE } = FORM_TYPES;

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff'
    }
  }
});

export default function SubForm({ isEdit, handleSubmit, setSubFormVisible }) {
  const { currSubFormData } = useCreatePaymentStore();
  const { debitType, transactionType, processingMode } = currSubFormData;
  const fileFormAttributes = {
    rows: [
      {
        fields: [
          {
            type: SELECT,
            defaultValue: debitType,
            componentProps: {
              required: true,
              name: 'debitType',
              label: 'Debit Type',
              'data-testid': 'debitType',
              options: DEBIT_TYPE
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
            defaultValue: processingMode,
            componentProps: {
              disabled: true,
              name: 'processingMode',
              label: 'Processing Mode',
              'data-testid': 'processingMode'
            }
          }
        ]
      }
    ]
  };

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
  } = currSubFormData;

  const applicantFormAttributes = (disabled) => {
    return {
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
                'data-testid': 'applicantPhone',
                type: 'number'
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
  };

  const {
    beneficiaryName,
    beneficiaryAccountNo,
    beneficiaryIdType,
    beneficiaryId,
    beneficiaryResidentCode,
    beneficiaryAccountBic,
    beneficiaryBankName,
    beneficiaryBankCountryCode,
    beneficiaryBankAddress1,
    beneficiaryBankAddress2,
    beneficiaryBankAddress3,
    beneficiaryAddress1,
    beneficiaryAddress2,
    beneficiaryAddress3,
    beneficiaryCountryCode
  } = currSubFormData;

  const beneficiaryFormAttributes = (disabled) => {
    return {
      title: {
        value: 'Beneficiary Details',
        variant: 'h5'
      },
      rows: [
        {
          fields: [
            {
              type: TEXT,
              defaultValue: beneficiaryName,
              componentProps: {
                disabled,
                required: true,
                name: 'beneficiaryName',
                label: 'Name',
                'data-testid': 'beneficiaryName'
              }
            },
            {
              type: TEXT,
              defaultValue: beneficiaryAccountNo,
              componentProps: {
                disabled,
                required: true,
                name: 'beneficiaryAccountNo',
                label: 'Account Number',
                'data-testid': 'beneficiaryAccountNo',
                type: 'number'
              }
            }
          ]
        },
        {
          fields: [
            {
              type: TEXT,
              defaultValue: beneficiaryIdType,
              componentProps: {
                disabled,
                name: 'beneficiaryIdType',
                label: 'ID Type',
                'data-testid': 'beneficiaryIdType'
              }
            },
            {
              type: TEXT,
              defaultValue: beneficiaryId,
              componentProps: {
                disabled,
                name: 'beneficiaryId',
                label: 'ID',
                'data-testid': 'beneficiaryId'
              }
            },
            {
              type: SELECT,
              defaultValue: beneficiaryResidentCode,
              componentProps: {
                disabled,
                name: 'beneficiaryResidentCode',
                label: 'Resident Code',
                'data-testid': 'beneficiaryResidentCode',
                options: RESIDENT_CODE
              }
            }
          ]
        },
        {
          fields: [
            {
              type: SELECT_AUTOCOMPLETE,
              defaultValue: beneficiaryAccountBic,
              componentProps: {
                disabled,
                required: true,
                disablePortal: true,
                id: 'beneficiaryAccountBic',
                name: 'beneficiaryAccountBic',
                label: 'Account BIC',
                'data-testid': 'beneficiaryAccountBic',
                options: ACCOUNT_BIC
              }
            },
            {
              type: TEXT,
              defaultValue: beneficiaryBankName,
              componentProps: {
                disabled,
                name: 'beneficiaryBankName',
                label: 'Bank Name',
                'data-testid': 'beneficiaryBankName'
              }
            },
            {
              type: TEXT,
              defaultValue: beneficiaryBankCountryCode,
              componentProps: {
                disabled: true,
                name: 'beneficiaryBankCountryCode',
                label: 'Bank Country Code',
                'data-testid': 'beneficiaryBankCountryCode'
              }
            }
          ]
        },
        {
          fields: [
            {
              type: TEXT,
              defaultValue: beneficiaryBankAddress1,
              componentProps: {
                disabled,
                name: 'beneficiaryBankAddress1',
                label: 'Bank Address 1',
                'data-testid': 'beneficiaryBankAddress1',
                multiline: true,
                rows: 3
              }
            },
            {
              type: TEXT,
              defaultValue: beneficiaryBankAddress2,
              componentProps: {
                disabled,
                name: 'beneficiaryBankAddress2',
                label: 'Bank Address 2',
                'data-testid': 'beneficiaryBankAddress2',
                multiline: true,
                rows: 3
              }
            },
            {
              type: TEXT,
              defaultValue: beneficiaryBankAddress3,
              componentProps: {
                disabled,
                name: 'beneficiaryBankAddress3',
                label: 'Bank Address 3',
                'data-testid': 'beneficiaryBankAddress3',
                multiline: true,
                rows: 3
              }
            }
          ]
        },
        {
          fields: [
            {
              type: TEXT,
              defaultValue: beneficiaryAddress1,
              componentProps: {
                disabled,
                name: 'beneficiaryAddress1',
                label: 'Address 1',
                'data-testid': 'beneficiaryAddress1',
                multiline: true,
                rows: 3
              }
            },
            {
              type: TEXT,
              defaultValue: beneficiaryAddress2,
              componentProps: {
                disabled,
                name: 'beneficiaryAddress2',
                label: 'Address 2',
                'data-testid': 'beneficiaryAddress2',
                multiline: true,
                rows: 3
              }
            },
            {
              type: TEXT,
              defaultValue: beneficiaryAddress3,
              componentProps: {
                disabled,
                name: 'beneficiaryAddress3',
                label: 'Address 3',
                'data-testid': 'beneficiaryAddress3',
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
              defaultValue: beneficiaryCountryCode,
              componentProps: {
                disabled,
                required: true,
                disablePortal: true,
                id: 'beneficiaryCountryCode',
                name: 'beneficiaryCountryCode',
                label: 'Country Code',
                'data-testid': 'beneficiaryCountryCode',
                options: COUNTRY_CODE
              }
            }
          ]
        }
      ]
    };
  };

  const {
    remittanceCurrency,
    remittanceAmount,
    fxContractReferenceNo,
    exchangeRate,
    creditingFxRate,
    debitingFxRate,
    paymentCurrency,
    paymentAmount,
    localEquivalentAmount
  } = currSubFormData;

  const paymentFormAttributes = {
    title: 'Payment Details',
    rows: [
      {
        fields: [
          {
            type: SELECT_AUTOCOMPLETE,
            defaultValue: remittanceCurrency,
            componentProps: {
              required: true,
              name: 'remittanceCurrency',
              label: 'Remittance Currency',
              'data-testid': 'remittanceCurrency',
              options: REMITTANCE_CURRENCY
            }
          },
          {
            type: TEXT,
            defaultValue: remittanceAmount,
            componentProps: {
              name: 'remittanceAmount',
              label: 'Remittance Amount',
              'data-testid': 'remittanceAmount',
              type: 'number'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: fxContractReferenceNo,
            componentProps: {
              required: true,
              disabled: true,
              name: 'fxContractReferenceNo',
              label: 'FX Contract Reference No',
              'data-testid': 'fxContractReferenceNo'
            }
          },
          {
            type: TEXT,
            defaultValue: exchangeRate,
            componentProps: {
              required: true,
              disabled: true,
              name: 'exchangeRate',
              label: 'Exchange Rate',
              'data-testid': 'exchangeRate'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: creditingFxRate,
            componentProps: {
              required: true,
              disabled: true,
              name: 'creditingFxRate',
              label: 'Crediting FX Rate',
              'data-testid': 'creditingFxRate'
            }
          },
          {
            type: TEXT,
            defaultValue: debitingFxRate,
            componentProps: {
              required: true,
              disabled: true,
              name: 'debitingFxRate',
              label: 'Debiting FX Rate',
              'data-testid': 'debitingFxRate'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: paymentCurrency,
            componentProps: {
              disabled: true,
              name: 'paymentCurrency',
              label: 'Payment Currency',
              'data-testid': 'paymentCurrency'
            }
          },
          {
            type: TEXT,
            defaultValue: paymentAmount,
            componentProps: {
              disabled: true,
              name: 'paymentAmount',
              label: 'Payment Amount',
              'data-testid': 'paymentAmount'
            }
          },
          {
            type: TEXT,
            defaultValue: localEquivalentAmount,
            componentProps: {
              disabled: true,
              name: 'localEquivalentAmount',
              label: 'Local Equivalent Amount (In SGD)',
              'data-testid': 'localEquivalentAmount'
            }
          }
        ]
      }
    ]
  };

  const { creditMidRate, debitMidRate, chargeBearer } = currSubFormData;
  const chargesFormAttributes = {
    title: 'Charges Details',
    rows: [
      {
        fields: [
          {
            type: TEXT,
            defaultValue: creditMidRate,
            componentProps: {
              disabled: true,
              name: 'creditMidRate',
              label: 'Credit Mid Rate',
              'data-testid': 'creditMidRate'
            }
          },
          {
            type: TEXT,
            defaultValue: debitMidRate,
            componentProps: {
              disabled: true,
              name: 'debitMidRate',
              label: 'Debit Mid Rate',
              'data-testid': 'debitMidRate'
            }
          },
          {
            type: SELECT,
            defaultValue: chargeBearer,
            componentProps: {
              required: true,
              name: 'chargeBearer',
              label: 'Charge Bearer',
              'data-testid': 'chargeBearer',
              options: CHARGE_BEARER
            }
          }
        ]
      }
    ]
  };

  const formAttributes = {
    sections: [
      fileFormAttributes,
      applicantFormAttributes(true),
      beneficiaryFormAttributes(false),
      paymentFormAttributes,
      chargesFormAttributes
    ],
    buttons: [
      {
        label: 'Back',
        color: 'neutral',
        type: 'button',
        onClick: () => setSubFormVisible(false)
      },
      {
        label: 'Reset',
        isReset: true
      },
      {
        label: isEdit ? 'Save' : 'Add',
        color: 'success'
      }
    ]
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <FormBuilder
          onSubmit={handleSubmit}
          formAttributes={formAttributes}
          id={currSubFormData.id}
        />
      </Box>
    </ThemeProvider>
  );
}
