import { formatToCurrency } from 'services/helper';
import { create } from 'zustand';
import {
  APPLICANT_DETAILS,
  BENEFICIARY_DETAILS,
  CHARGES_DETAILS,
  CORRESPONDENT_BANK_DETAILS,
  PAYMENT_DETAILS,
  SUB_FILE_DETAILS,
  TRANSACTION_DETAILS
} from '../form_templates';

export const INITIAL_PAYMENT_SUB_FORM_STATE = {
  ...SUB_FILE_DETAILS,
  ...APPLICANT_DETAILS,
  ...BENEFICIARY_DETAILS,
  ...PAYMENT_DETAILS,
  ...CHARGES_DETAILS,
  ...CORRESPONDENT_BANK_DETAILS,
  ...TRANSACTION_DETAILS
};

export const getTransactionColumns = (debitType) =>
  debitType === 'single'
    ? [
        { id: 'action', label: 'Action', minWidth: 160, sortable: false },
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
        { id: 'action', label: 'Action', minWidth: 160, sortable: false },
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

export const createPaymentStore = (initialStoreData) =>
  create((set) => ({
    ...initialStoreData,
    setApplicantDetails: (applicantDetails) =>
      set({ applicantDetails: applicantDetails }),
    setCurrMainFormData: (currMainFormData) =>
      set({ currMainFormData: currMainFormData }),
    setCurrSubFormData: (currSubFormData) =>
      set({ currSubFormData: currSubFormData }),
    resetCurrSubFormData: () =>
      set({ currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE }),
    setSubFormDataList: (subFormDataList) =>
      set({ subFormDataList: subFormDataList }),
    setTransactionRows: (transactionRows) => set({ transactionRows }),
    setTransactionColumns: (transactionColumns) => set({ transactionColumns }),
    setTransactionSummaryData: (transactionSummaryData) =>
      set({ transactionSummaryData: transactionSummaryData }),
    setShowConfirmationPage: (showConfirmationPage) =>
      set({ showConfirmationPage: showConfirmationPage }),
    setShowReviewPage: (showReviewPage) =>
      set({ showReviewPage: showReviewPage }),
    setErrorOnConfirm: (errorOnConfirm) =>
      set({ errorOnConfirm: errorOnConfirm }),
    resetStore: () => {
      const {
        APPLICANT_DETAILS,
        MAIN_FILE_DETAILS,
        TRANSACTION_SUMMARY,
        transactionColumns
      } = initialStoreData;
      set({
        applicantDetails: APPLICANT_DETAILS,
        currMainFormData: MAIN_FILE_DETAILS,
        currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE,
        subFormDataList: [],
        transactionRows: [],
        transactionColumns: transactionColumns,
        transactionSummaryData: TRANSACTION_SUMMARY,
        showConfirmationPage: false,
        showReviewPage: false,
        errorOnConfirm: false
      });
    }
  }));
