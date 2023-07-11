import { create } from 'zustand';
import {
  MAIN_FILE_DETAILS,
  APPLICANT_DETAILS,
  BENEFICIARY_DETAILS,
  CHARGES_DETAILS,
  CORRESPONDENT_BANK_DETAILS,
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

export const useCreatePaymentStore = create((set) => ({
  applicantDetails: APPLICANT_DETAILS,
  currMainFormData: MAIN_FILE_DETAILS,
  currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE,
  subFormDataList: [INITIAL_PAYMENT_SUB_FORM_STATE],
  transactionRows: [],
  requesterComments: TRANSACTION_SUMMARY.requesterComments,
  showConfirmationPage: false,
  showReviewPage: false,
  errorInCreation: false,
  setApplicantDetails: (applicantDetails) =>
    set(() => ({ applicantDetails: applicantDetails })),
  setCurrSubFormData: (currSubFormData) =>
    set(() => ({ currSubFormData: currSubFormData })),
  resetCurrSubFormData: () =>
    set(() => ({ currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE })),
  setSubFormDataList: (subFormDataList) =>
    set(() => ({ subFormDataList: subFormDataList })),
  setTransactionRows: (transactionRows) =>
    set(() => ({ transactionRows: transactionRows })),
  setRequesterComments: (requesterComments) =>
    set(() => ({ requesterComments: requesterComments })),
  setShowConfirmationPage: (showConfirmationPage) =>
    set(() => ({ showConfirmationPage: showConfirmationPage })),
  setShowReviewPage: (showReviewPage) =>
    set(() => ({ showReviewPage: showReviewPage })),
  setErrorInCreation: (errorInCreation) =>
    set(() => ({ errorInCreation: errorInCreation })),
  resetStore: () =>
    set(() => ({
      applicantDetails: APPLICANT_DETAILS,
      currMainFormData: MAIN_FILE_DETAILS,
      currSubFormData: INITIAL_PAYMENT_SUB_FORM_STATE,
      subFormDataList: [],
      transactionRows: [],
      requesterComments: '',
      showConfirmationPage: false,
      showReviewPage: false
    }))
}));
