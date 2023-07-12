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
import { createPaymentStore } from '../shared/payment_store';

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
  subFormDataList: [INITIAL_PAYMENT_SUB_FORM_STATE],
  transactionRows: [],
  requesterComments: TRANSACTION_SUMMARY.requesterComments,
  showConfirmationPage: false,
  showReviewPage: false,
  errorOnConfirm: false
};

export const useCreatePaymentStore = createPaymentStore(initialStoreData);
