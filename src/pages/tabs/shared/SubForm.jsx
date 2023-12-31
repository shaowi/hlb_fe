import { Box, ThemeProvider } from '@mui/material';
import FormBuilder, { FORM_TYPES } from 'components/forms_ui/FormBuilder';
import {
  ACCOUNT_BIC,
  CHARGE_BEARER,
  COUNTRY_CODE,
  DEBIT_TYPE,
  REMITTANCE_CURRENCY,
  RESIDENT_CODE,
  TRANSACTION_PURPOSE_CODE
} from 'constant';
import {
  convertToLocalCurrency,
  convertToPaymentAmount
} from 'services/helper';
import { theme } from 'theme';
import { useRef } from 'react';

const { TEXT, SELECT, SELECT_AUTOCOMPLETE, LABEL } = FORM_TYPES;

/**
 * The `SubForm` component is a React component that renders a form with multiple sections and fields, including file form
 * attributes and applicant, beneficiary, payment, charges, correspondent bank and transaction form attributes.
 * @returns a JSX element.
 */
export default function SubForm(props) {
  const formikRef = useRef();
  const {
    onSubmit,
    resetCurrSubFormData,
    setSubFormVisible,
    isEdit,
    disabled = false,
    isFormEditable,
    currSubFormData,
    isSingleDebit
  } = props;
  const debitFeeLabel = `Debit Fee in ${currSubFormData.paymentCurrency}`;
  const standardFeeLabel = 'Standard Fee in SGD';

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
              disabled: true,
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
      ]
    };
  };

  const {
    beneficiaryName,
    beneficiaryAccountNumber,
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
              defaultValue: beneficiaryAccountNumber,
              componentProps: {
                disabled,
                required: true,
                name: 'beneficiaryAccountNumber',
                label: 'Account Number',
                'data-testid': 'beneficiaryAccountNumber',
                type: 'number'
              },
              validateEquality: {
                other: 'applicantAccountNumber',
                shouldBeEqual: false,
                errorMessage:
                  'Beneficiary Account Number cannot be the same as Applicant Account Number'
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
    creditFxRate,
    debitFxRate,
    paymentCurrency,
    paymentAmount,
    localEquivalentAmount
  } = currSubFormData;

  const paymentFormAttributes = {
    title: {
      value: 'Payment Details',
      variant: 'h5'
    },
    rows: [
      {
        fields: [
          {
            type: SELECT_AUTOCOMPLETE,
            defaultValue: remittanceCurrency,
            componentProps: {
              required: true,
              disabled,
              name: 'remittanceCurrency',
              label: 'Remittance Currency',
              'data-testid': 'remittanceCurrency',
              options: REMITTANCE_CURRENCY,
              onChange: (prevVal, curVal) =>
                console.log(
                  'changed remitCurrency from: ',
                  prevVal,
                  ' to: ',
                  curVal
                ) // TODO: Add logic to update fx rates
            }
          },
          {
            type: TEXT,
            defaultValue: remittanceAmount,
            componentProps: {
              disabled,
              name: 'remittanceAmount',
              label: 'Remittance Amount',
              'data-testid': 'remittanceAmount',
              type: 'number',
              afterChange: (prevVal, curVal) => {
                console.log('changed remitAmt from: ', prevVal, ' to ', curVal);
                // TODO: Add logic to update payment amount
                formikRef.current.setFieldValue(
                  'paymentAmount',
                  convertToPaymentAmount(curVal)
                );
                formikRef.current.setFieldValue(
                  'localEquivalentAmount',
                  convertToLocalCurrency(curVal)
                );
              }
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
            defaultValue: creditFxRate,
            componentProps: {
              required: true,
              disabled: true,
              name: 'creditFxRate',
              label: 'Credit FX Rate',
              'data-testid': 'creditFxRate'
            }
          },
          {
            type: TEXT,
            defaultValue: debitFxRate,
            componentProps: {
              required: true,
              disabled: true,
              name: 'debitFxRate',
              label: 'Debit FX Rate',
              'data-testid': 'debitFxRate'
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

  const {
    creditMidRate,
    debitMidRate,
    chargeBearer,
    commissionInLieuOfExchange,
    commissionHandle
  } = currSubFormData;
  const chargesFormAttributes = {
    title: {
      value: 'Charges Details',
      variant: 'h5'
    },
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
              disabled,
              name: 'chargeBearer',
              label: 'Charge Bearer',
              'data-testid': 'chargeBearer',
              options: CHARGE_BEARER,
              onChange: (prevVal, curVal) =>
                console.log(
                  'changed chargedBearer from: ',
                  prevVal,
                  ' to: ',
                  curVal
                ) // TODO: Add logic to update debit fees and standard fees
            }
          }
        ]
      },
      {
        fields: [
          {
            type: LABEL,
            defaultValue: 'Commission In Lieu Of Exchange',
            componentProps: {
              variant: 'subtitle1'
            }
          },
          {
            type: TEXT,
            defaultValue: commissionInLieuOfExchange,
            componentProps: {
              disabled,
              name: 'commissionInLieuOfExchange',
              label: debitFeeLabel,
              'data-testid': 'debitMidRate',
              afterChange: (prevVal, curVal) =>
                console.log(
                  'changed commissionInLieuOfExchange from: ',
                  prevVal,
                  ' to ',
                  curVal
                ) // TODO: Add logic to update standard fee for commissionInLieuOfExchange
            }
          },
          {
            type: TEXT,
            defaultValue: convertToLocalCurrency(commissionInLieuOfExchange),
            componentProps: {
              disabled: true,
              name: 'commissionInLieuOfExchangeStandard',
              label: standardFeeLabel,
              'data-testid': 'commissionInLieuOfExchangeStandard'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: LABEL,
            defaultValue: 'Commission Handling',
            componentProps: {
              variant: 'subtitle1'
            }
          },
          {
            type: TEXT,
            defaultValue: commissionHandle,
            componentProps: {
              disabled,
              name: 'commissionHandle',
              label: debitFeeLabel,
              'data-testid': 'commissionHandle',
              afterChange: (prevVal, curVal) =>
                console.log(
                  'changed commissionHandle from: ',
                  prevVal,
                  ' to ',
                  curVal
                ) // TODO: Add logic to update standard fee for commissionHandle
            }
          },
          {
            type: TEXT,
            defaultValue: convertToLocalCurrency(commissionHandle),
            componentProps: {
              disabled: true,
              name: 'commissionHandleStandard',
              label: standardFeeLabel,
              'data-testid': 'commissionHandleStandard'
            }
          }
        ]
      }
    ]
  };

  const { sendersCorrespondent, receiversCorrespondent } = currSubFormData;
  const correspondentBankDetailsAttributes = {
    title: {
      value: 'Correspondent Bank Details',
      variant: 'h5'
    },
    rows: [
      {
        fields: [
          {
            type: TEXT,
            defaultValue: sendersCorrespondent,
            componentProps: {
              required: true,
              disabled: true,
              name: 'sendersCorrespondent',
              label: "Sender's Correspondent",
              'data-testid': 'sendersCorrespondent'
            }
          },
          {
            type: TEXT,
            defaultValue: receiversCorrespondent,
            componentProps: {
              disabled,
              name: 'receiversCorrespondent',
              label: "Receiver's Correspondent",
              'data-testid': 'receiversCorrespondent'
            }
          }
        ]
      }
    ]
  };

  const {
    channelTransactionReference,
    recipientReference,
    purposeCode,
    remittanceInfo,
    additionalRemittanceInfo,
    senderToReceiverInfo,
    additionalSenderToReceiverInfo,
    otherPaymentDetails,
    additionalRemarks
  } = currSubFormData;
  const transactionDetailsAttributes = {
    title: {
      value: 'Transaction Details',
      variant: 'h5'
    },
    rows: [
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
            defaultValue: recipientReference,
            componentProps: {
              disabled,
              name: 'recipientReference',
              label: 'Recipient Reference',
              'data-testid': 'recipientReference'
            }
          },
          {
            type: SELECT,
            defaultValue: purposeCode,
            componentProps: {
              disabled,
              name: 'purposeCode',
              label: 'Purpose Code',
              'data-testid': 'purposeCode',
              options: TRANSACTION_PURPOSE_CODE
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: remittanceInfo,
            componentProps: {
              disabled,
              name: 'remittanceInfo',
              label: 'Remittance Information',
              'data-testid': 'remittanceInfo'
            }
          },
          {
            type: TEXT,
            defaultValue: additionalRemittanceInfo,
            componentProps: {
              disabled,
              name: 'additionalRemittanceInfo',
              label: 'Additional Remittance Information',
              'data-testid': 'additionalRemittanceInfo'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: senderToReceiverInfo,
            componentProps: {
              disabled,
              name: 'senderToReceiverInfo',
              label: 'Sender to Receiver Information',
              'data-testid': 'senderToReceiverInfo'
            }
          },
          {
            type: TEXT,
            defaultValue: additionalSenderToReceiverInfo,
            componentProps: {
              disabled,
              name: 'additionalSenderToReceiverInfo',
              label: 'Additional Sender to Receiver Information',
              'data-testid': 'additionalSenderToReceiverInfo'
            }
          }
        ]
      },
      {
        fields: [
          {
            type: TEXT,
            defaultValue: otherPaymentDetails,
            componentProps: {
              disabled,
              name: 'otherPaymentDetails',
              label: 'Other Payment Details',
              'data-testid': 'otherPaymentDetails',
              multiline: true,
              rows: 3
            }
          },
          {
            type: TEXT,
            defaultValue: additionalRemarks,
            componentProps: {
              disabled,
              name: 'additionalRemarks',
              label: 'Additional Remarks',
              'data-testid': 'additionalRemarks',
              multiline: true,
              rows: 3
            }
          }
        ]
      }
    ]
  };

  const buttons = [
    {
      label: 'Back',
      type: 'button',
      componentProps: {
        color: 'neutral',
        onClick: () => {
          resetCurrSubFormData();
          setSubFormVisible(false);
        }
      }
    }
  ];

  if (isFormEditable) {
    buttons.push.apply(buttons, [
      {
        type: 'reset',
        label: 'Reset'
      },
      {
        label: isEdit ? 'Save' : 'Add',
        componentProps: {
          color: 'success'
        }
      }
    ]);
  }
  const formAttributes = {
    sections: [
      fileFormAttributes,
      applicantFormAttributes(disabled || isSingleDebit),
      beneficiaryFormAttributes(disabled),
      paymentFormAttributes,
      chargesFormAttributes,
      correspondentBankDetailsAttributes,
      transactionDetailsAttributes
    ],
    buttons
  };

  const formBuilderProps = {
    onSubmit,
    formAttributes,
    id: currSubFormData.id,
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
