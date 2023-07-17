import { formatToCurrency } from 'services/helper';
import { create } from 'zustand';
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

export const transactionColumns = [
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
    id: 'beneficiaryAccountNo',
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
];

export const createPaymentStore = (initialStoreData) =>
  create((set) => ({
    ...initialStoreData,
    setApplicantDetails: (applicantDetails) =>
      set(() => ({ applicantDetails: applicantDetails })),
    setCurrMainFormData: (currMainFormData) =>
      set(() => ({ currMainFormData: currMainFormData })),
    setCurrSubFormData: (currSubFormData) =>
      set(() => ({ currSubFormData: currSubFormData })),
    resetCurrSubFormData: () =>
      set(() => ({ currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE })),
    setSubFormDataList: (subFormDataList) =>
      set(() => ({ subFormDataList: subFormDataList })),
    setTransactionRows: (transactionRows) =>
      set(() => ({ transactionRows: transactionRows })),
    setTransactionSummaryData: (transactionSummaryData) =>
      set(() => ({ transactionSummaryData: transactionSummaryData })),
    setShowConfirmationPage: (showConfirmationPage) =>
      set(() => ({ showConfirmationPage: showConfirmationPage })),
    setShowReviewPage: (showReviewPage) =>
      set(() => ({ showReviewPage: showReviewPage })),
    setErrorOnConfirm: (errorOnConfirm) =>
      set(() => ({ errorOnConfirm: errorOnConfirm })),
    resetStore: () =>
      set(() => ({
        applicantDetails: APPLICANT_DETAILS,
        currMainFormData: MAIN_FILE_DETAILS,
        currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE,
        subFormDataList: [],
        transactionRows: [],
        transactionSummaryData: TRANSACTION_SUMMARY,
        showConfirmationPage: false,
        showReviewPage: false
      }))
  }));
