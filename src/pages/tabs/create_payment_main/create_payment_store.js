import { formatToCurrency } from 'services/helper';
import {
  APPLICANT_DETAILS,
  BENEFICIARY_DETAILS,
  CHARGES_DETAILS,
  CORRESPONDENT_BANK_DETAILS,
  MAIN_FILE_DETAILS,
  PAYMENT_DETAILS,
  SUB_FILE_DETAILS,
  TRANSACTION_DETAILS,
  TRANSACTION_SUMMARY
} from '../mock_form_templates';
import { createPaymentStore } from '../shared/payment_store';

export const getTransactionColumns = (debitType) =>
  debitType === 'single'
    ? [
        {
          id: 'action',
          label: 'Action',
          minWidth: 160,
          sortable: false
        },
        {
          id: 'channelTransactionReference',
          label: 'Channel Transaction Reference',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'processingMode',
          label: 'Processing Mode',
          minWidth: 100,
          sortable: true
        },
        {
          id: 'beneficiaryName',
          label: 'Beneficiary Name',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'beneficiaryAccountNumber',
          label: 'Beneficiary Account Number',
          minWidth: 120,
          sortable: true
        },
        {
          id: 'beneficiaryBankName',
          label: 'Beneficiary Bank Name',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'beneficiaryAccountBic',
          label: 'Beneficiary Account Bic',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'remittanceAmount',
          label: 'Remittance Amount',
          minWidth: 120,
          sortable: true,
          format: (value) => formatToCurrency(value)
        },
        {
          id: 'paymentAmount',
          label: 'Payment Amount',
          minWidth: 120,
          sortable: true,
          format: (value) => formatToCurrency(value)
        },
        {
          id: 'fxContractReferenceNo',
          label: 'FX Contract Reference Number',
          minWidth: 170,
          sortable: true
        }
      ]
    : [
        {
          id: 'action',
          label: 'Action',
          minWidth: 160,
          sortable: false
        },
        {
          id: 'channelTransactionReference',
          label: 'Channel Transaction Reference',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'processingMode',
          label: 'Processing Mode',
          minWidth: 100,
          sortable: true
        },
        {
          id: 'applicantName',
          label: 'Applicant Name',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'applicantAccountNumber',
          label: 'Debiting Account Number',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'debitingAccountNumber',
          label: 'Debiting Account Currency',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'debitingAccountType',
          label: 'Debiting Account Type',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'beneficiaryName',
          label: 'Beneficiary Account Name',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'beneficiaryAccountNumber',
          label: 'Beneficiary Account Number',
          minWidth: 120,
          sortable: true
        },
        {
          id: 'beneficiaryBankName',
          label: 'Beneficiary Bank Name',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'beneficiaryAccountBic',
          label: 'Beneficiary Account Bic',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'remittanceAmount',
          label: 'Remittance Amount',
          minWidth: 120,
          sortable: true,
          format: (value) => formatToCurrency(value)
        },
        {
          id: 'fxContractReferenceNo',
          label: 'FX Contract Reference Number',
          minWidth: 170,
          sortable: true
        },
        {
          id: 'paymentAmount',
          label: 'Payment Amount',
          minWidth: 120,
          sortable: true,
          format: (value) => formatToCurrency(value)
        }
      ];

export const INITIAL_PAYMENT_SUB_FORM_STATE = {
  ...SUB_FILE_DETAILS,
  ...APPLICANT_DETAILS,
  ...BENEFICIARY_DETAILS,
  ...PAYMENT_DETAILS,
  ...CHARGES_DETAILS,
  ...CORRESPONDENT_BANK_DETAILS,
  ...TRANSACTION_DETAILS
};

const initialStoreData = {
  applicantDetails: APPLICANT_DETAILS,
  currMainFormData: MAIN_FILE_DETAILS,
  currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE,
  subFormDataList: [],
  transactionRows: [],
  transactionColumns: getTransactionColumns(MAIN_FILE_DETAILS.debitType),
  transactionSummaryData: TRANSACTION_SUMMARY,
  showConfirmationPage: false,
  showReviewPage: false,
  errorOnConfirm: false
};

export const useCreatePaymentStore = createPaymentStore(initialStoreData);
